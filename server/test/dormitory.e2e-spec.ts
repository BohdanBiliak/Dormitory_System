import { INestApplication } from '@nestjs/common';
import { createTestApp } from './utils/test-app.factory';
import request, { SuperTest, Test } from 'supertest';
import path from 'path';
import fs from 'fs';

describe('DormitoryController (e2e) with SuperTest', () => {
    let app: INestApplication;
    let agent: any;
    let redisClient: any;
    let createdId: string;

    beforeAll(async () => {
        app = await createTestApp();
        redisClient = (app as any).redisClient;
        const server = app.getHttpServer();
        agent = request.agent(server);

        const loginRes = await agent
            .post('/auth/login')
            .send({ email: 'arheroha@gmail.com', password: '12345678' })
            .expect(200);
        console.log('Login headers:', loginRes.headers);
    });

    afterAll(async () => {
        await redisClient.disconnect();
        await app.close();
    });

    it('GET /dormitories → returns list', async () => {
        const res = await agent.get('/dormitories').expect(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /dormitories → creates a dorm', async () => {
        // Ensure fixtures exist
        const fixturesDir = path.join(__dirname, 'fixtures');
        if (!fs.existsSync(fixturesDir)) fs.mkdirSync(fixturesDir);
        ['photo1.jpg', 'photo2.jpg'].forEach(fn => {
            const p = path.join(fixturesDir, fn);
            if (!fs.existsSync(p)) fs.writeFileSync(p, 'dummy');
        });

        const roomGen = { numberOfFloors: 2, roomsPerFloor: 2, pricePerDay: 30, pricePerMonth: 500 };
        const req = agent
            .post('/dormitories')
            .field('name', 'Dorm A')
            .field('address', '123 Dorm Street')
            .field('groundFloorPhoneNumber', '+380987654321')
            .field('roomGeneration', JSON.stringify(roomGen))
            .attach('photos', path.join(fixturesDir, 'photo1.jpg'))
            .attach('photos', path.join(fixturesDir, 'photo2.jpg'));

        const res = await req.expect(201);
        expect(res.body).toHaveProperty('id');
        createdId = res.body.id;
    });

    it('GET /dormitories/:id → fetches by ID', async () => {
        const res = await agent.get(`/dormitories/${createdId}`).expect(200);
        expect(res.body.id).toBe(createdId);
    });

    it('PATCH /dormitories/:id → updates name', async () => {
        const res = await agent
            .patch(`/dormitories/${createdId}`)
            .send({ name: 'Updated Dorm Name' })
            .expect(200);
        expect(res.body.name).toBe('Updated Dorm Name');
    });

    it('PATCH /dormitories/:id/deactivate → deactivates', async () => {
        const res = await agent
            .patch(`/dormitories/${createdId}/deactivate`)
            .expect(200);
        expect(res.body.status).toBe('NotActive');
    });
});
