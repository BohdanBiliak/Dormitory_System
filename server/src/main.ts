import "./instrument";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import session from "express-session";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import { SwaggerSetup } from "@/libs/swagger/swagger.module";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { SecurityConfig } from "@/config/security.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const securityConfig = new SecurityConfig(config);

  // Compression
  app.use(compression());

  // Rate Limiting
  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later.",
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Redis client

  
  const redisClient = createClient({
    url: config.getOrThrow("REDIS_URI"),
    legacyMode: true,
  } as any);
  await redisClient.connect();

  // express-session 
  const sessionConfig = securityConfig.getSessionConfig();
  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        prefix: config.getOrThrow<string>("SESSION_FOLDER") + ":",
        ttl: sessionConfig.cookie.maxAge / 1000, 
        disableTouch: false,
        disableTTL: false,
      }),
      ...sessionConfig,
    }),
  );

  // cookie parser
  app.use(cookieParser(config.getOrThrow("COOKIE_SECRET")));

  if (config.get("NODE_ENV") === "development") {
    app.use((req, res, next) => {
      if (req.session?.user) {
        req.user = req.session.user;
      } else {
        console.log("No user in session.");
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
    }),
  );

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
    exposeHeaders: ["set-cookie"],
    exposedHeaders: ["set-cookie"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });

  // Swagger
  SwaggerSetup.setup(app);

  await app.listen(config.getOrThrow<number>("APPLICATION_PORT"));
}

bootstrap();
