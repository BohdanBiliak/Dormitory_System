import { INestApplication } from '@nestjs/common';
import { createTestApp } from './utils/test-app.factory';
import request, { SuperAgentTest } from 'supertest';
import fs from 'fs';
import path from 'path';

describe('AdminController (e2e)', () => {
  let app: INestApplication;
  let agent: any;
  let redisClient: any;
  let adminId: string;

    const adminCredentials = {
        email: 'bohdan.biliak.detrox@email.com',
        password: '12345678',
    };
    beforeAll(async () => {
        app = await createTestApp();
        redisClient = (app as any).redisClient;
        agent = request.agent(app.getHttpServer())

        const loginRes = await agent.post('/auth/login').send(adminCredentials).expect(200);
        expect(loginRes.headers['set-cookie']).toBeDefined();
    })
    afterAll(async () => {
        await redisClient.disconnect();
        await app.close();
    });

    it('GET /admin/profile → returns current admin profile', async () => {
        const res = await agent.get('/admin/profile').send({
            displayName: 'Test Admin',
            secondName: 'Updated',
        }).expect(200);
        expect(res.body.displayName).toBe('Test Admin');
        expect(res.body.secondName).toBe('Updated');
    })
})