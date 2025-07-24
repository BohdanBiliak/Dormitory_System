import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import { SwaggerSetup } from '@/libs/swagger/swagger.module';
import { ms, StringValue } from '@/libs/utils/ms.util';
import { parseBoolean } from '@/libs/utils/parse_boolean';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { SecurityConfig } from '@/config/security.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const securityConfig = new SecurityConfig(config);

    
    // Compression
    app.use(compression());
    
    // Rate Limiting
    app.use('/api', rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
    }));

    // Redis client
    const redisClient = createClient({
        url: config.getOrThrow('REDIS_URI'),
        legacyMode: true,
    } as any);
    await redisClient.connect();

    // express-session with improved security
    const sessionConfig = securityConfig.getSessionConfig();
    app.use(
        session({
            store: new RedisStore({
                client: redisClient,
                prefix: config.getOrThrow<string>('SESSION_FOLDER') + ':',
                ttl: sessionConfig.cookie.maxAge / 1000, // Convert to seconds
                disableTouch: false,
                disableTTL: false,
            }),
            ...sessionConfig,
        })
    );

    // cookie parser
    app.use(cookieParser(config.getOrThrow('COOKIE_SECRET')));

    // req.user ← з req.session.user (remove in production)
    if (config.get('NODE_ENV') === 'development') {
        app.use((req, res, next) => {
            console.log('Current session:', req.session);
            if (req.session?.user) {
                console.log('Assigning req.user from session...');
                req.user = req.session.user;
            } else {
                console.log('No user in session.');
            }
            next();
        });
    } else {
        // Production: Silent session handling
        app.use((req, res, next) => {
            if (req.session?.user) {
                req.user = req.session.user;
            }
            next();
        });
    }

    // Global validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        })
    );

    // CORS
    app.enableCors({
        origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
        credentials: true,
        exposeHeaders: ['set-cookie'],
    });

    // Swagger
    SwaggerSetup.setup(app);

    await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}

bootstrap();
