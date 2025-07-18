import { INestApplication } from '@nestjs/common';
import { createTestApp } from './utils/test-app.factory';
import request, { SuperTest, Test } from 'supertest';
import path from 'path';
import fs from 'fs';

const regularUser = {
    email: 'arheroha@gmail.com',
    password: '12345678',
};

const adminUser = {
    email: 'bohdan.biliak.detrox@email.com',
    password: '12345678',
};

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

    it('POST /announcements — creates announcement', async () => {
        const res = await agent
            .post('/announcements')
            .send({
                title: 'Test Announcement',
                content: 'This is a test',
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
                attachmentUrls: [],
                forEveryone: true
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        createdId = res.body.id;
    });

    it('GET /announcements — returns all announcements', async () => {
        const res = await agent.get('/announcements').expect(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.find(a => a.id === createdId)).toBeDefined();
    });

    it('GET /announcements/:id — fetches by ID', async () => {
        const res = await agent.get(`/announcements/${createdId}`).expect(200);
        expect(res.body.id).toBe(createdId);
    });

    it('PATCH /announcements/:id — updates announcement', async () => {
        const res = await agent
            .patch(`/announcements/${createdId}`)
            .send({ title: 'Updated Title' })
            .expect(200);
        expect(res.body.title).toBe('Updated Title');
    });

    it('DELETE /announcements/:id — soft deletes announcement', async () => {
        const res = await agent
            .delete(`/announcements/${createdId}`)
            .expect(200);
        expect(res.body.isHidden).toBe(true);
    });

    let roomId: string;

    it('GET /rooms/avalible → returns filtered list', async () => {
        const res = await agent
            .get('/rooms/avalible')
            .query({ from: '2025-08-01', to: '2025-08-10' })
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
            roomId = res.body[0].id;
        }
    });

    it('POST /rooms/request-accommodation → creates request', async () => {
        if (!roomId) return;

        const res = await agent
            .post('/rooms/request-accommodation')
            .send({
                roomId,
                from: '2025-08-15',
                to: '2025-08-20',
                numberOfPeople: 1,
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
    });


});
