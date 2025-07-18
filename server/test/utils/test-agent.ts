import request from 'supertest';
import { INestApplication } from '@nestjs/common';

export async function getAuthenticatedAgent(
    app: INestApplication,
    email: string,
    password: string
): Promise<ReturnType<typeof request.agent>> {
    const agent = request.agent(app.getHttpServer());
    await agent.post('/auth/login').send({ email, password }).expect(200);
    return agent;
}