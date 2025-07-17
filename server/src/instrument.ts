import * as Sentry from "@sentry/nestjs"

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENV || 'development',
    tracesSampleRate:1.0,
    sendDefaultPii: true,
});
