import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { ms } from '../../src/libs/utils/ms.util';
import { parseBoolean } from '../../src/libs/utils/parse_boolean';

export async function createTestApp(): Promise<INestApplication> {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    const config = app.get(ConfigService);

    // -- Redis та сесії
    const redisClient = createClient({ url: config.getOrThrow('REDIS_URI') });
    redisClient.on('error', e => console.error('Redis error', e));
    await redisClient.connect();

    app.use(
        session({
            store: new RedisStore({
                client: redisClient,
                prefix: config.getOrThrow<string>('SESSION_FOLDER') + ':',
                ttl: 60 * 60 * 24 * 30,
            }),
            secret: config.getOrThrow('SESSION_SECRET'),
            name: config.getOrThrow('SESSION_NAME'),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: ms(config.getOrThrow('SESSION_MAX_AGE')),
                httpOnly: parseBoolean(config.getOrThrow('SESSION_HTTP_ONLY')),
                secure: parseBoolean(config.getOrThrow('SESSION_SECURE')),
                sameSite: 'lax',
            },
        }),
    );

    app.use(cookieParser(config.getOrThrow('COOKIE_SECRET')));

    // Проброс user з req.session у req.user
    app.use((req, _, next) => {
        if (req.session?.user) req.user = req.session.user;
        next();
    });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    // Зберігаємо redisClient, щоб потім відключити
    ;(app as any).redisClient = redisClient;

    await app.init();
    return app;
}
