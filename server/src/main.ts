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

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    // Redis client
    const redisClient = createClient({
        url: config.getOrThrow('REDIS_URI'),
        legacyMode: true,
    } as any);
    await redisClient.connect();

    // express-session з Redis
    app.use(
        session({
            store: new RedisStore({
                client: redisClient,
                prefix: config.getOrThrow<string>('SESSION_FOLDER') + ':',
                ttl: 60 * 60 * 24 * 30, // 30 днів
                disableTouch: false,
                disableTTL: false,
            }),
            secret: config.getOrThrow<string>('SESSION_SECRET'),
            name: config.getOrThrow<string>('SESSION_NAME'),
            resave: false,
            saveUninitialized: false,
            cookie: {
                domain: config.getOrThrow<string>('SESSION_DOMAIN'),
                maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
                httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
                secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
                sameSite: 'lax',
            },
        })
    );

    // cookie parser
    app.use(cookieParser(config.getOrThrow('COOKIE_SECRET')));

    // req.user ← з req.session.user
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
