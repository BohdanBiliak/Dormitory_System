import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { createClient } from "redis";
import * as session from "express-session";
import {RedisStore} from "connect-redis";
import { ms, StringValue } from "@/libs/common/utils/ms.util";
import { parseBoolean } from "@/libs/common/utils/parse_boolean";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    const redisClient = createClient({
        url: config.getOrThrow("REDIS_URI"),
        legacyMode: true,
    }as any);
    await redisClient.connect();

    app.use(cookieParser(config.getOrThrow("COOKIE_SECRET")));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: redisClient,
                prefix: config.getOrThrow<string>("SESSION_FOLDER") + ":",
                ttl: 60 * 60 * 24 * 30,
                disableTouch: false,
                disableTTL: false,
            }),
            secret: config.getOrThrow<string>("SESSION_SECRET"),
            name: config.getOrThrow<string>("SESSION_NAME"),
            resave: false,
            saveUninitialized: false,
            cookie: {
                domain: config.getOrThrow<string>("SESSION_DOMAIN"),
                maxAge: ms(config.getOrThrow<StringValue>("SESSION_MAX_AGE")),
                httpOnly: parseBoolean(config.getOrThrow<string>("SESSION_HTTP_ONLY")),
                secure: parseBoolean(config.getOrThrow<string>("SESSION_SECURE")),
                sameSite: "lax",
            },
        })
    );

    app.enableCors({
        origin: config.getOrThrow<string>("ALLOWED_ORIGIN"),
        credentials: true,
        exposeHeaders: ["set-cookie"],
    });

    await app.listen(config.getOrThrow<number>("APPLICATION_PORT"));
}

bootstrap();
