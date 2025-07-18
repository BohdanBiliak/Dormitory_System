import { INestApplication } from '@nestjs/common';
import { createTestApp } from './utils/test-app.factory';
import request, { SuperTest, Test } from 'supertest';
import path from 'path';
import fs from 'fs';

describe('DormitoryController (e2e) with SuperTest', () => {
    let app: INestApplication;
    let agent: any;
    let redisClient: any;
    let dormitoryId: string;
    let announcementId: string;
    let roomId: string;

    const fixturesDir = path.join(__dirname, 'fixtures');

    beforeAll(async () => {
        app = await createTestApp();
        redisClient = (app as any).redisClient;

        const server = app.getHttpServer();
        agent = request.agent(server);

        // Логін
        await agent
            .post('/auth/login')
            .send({ email: 'arheroha@gmail.com', password: '12345678' })
            .expect(200);

        // Створити dummy фото, якщо не існують
        if (!fs.existsSync(fixturesDir)) fs.mkdirSync(fixturesDir);
        ['photo1.jpg', 'photo2.jpg'].forEach((file) => {
            const filePath = path.join(fixturesDir, file);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, 'dummy');
            }
        });
    });

    afterAll(async () => {
        // Очистити файли
        ['photo1.jpg', 'photo2.jpg'].forEach((file) => {
            const filePath = path.join(fixturesDir, file);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });

        if (fs.existsSync(fixturesDir)) fs.rmdirSync(fixturesDir);

        await redisClient.disconnect();
        await app.close();
    });

    it('GET /dormitories → returns list', async () => {
        const res = await agent.get('/dormitories').expect(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /dormitories → creates a dorm', async () => {
        const roomGen = {
            numberOfFloors: 2,
            roomsPerFloor: 2,
            pricePerDay: 30,
            pricePerMonth: 500,
        };

        const res = await agent
            .post('/dormitories')
            .field('name', 'Dorm A')
            .field('address', '123 Dorm Street')
            .field('groundFloorPhoneNumber', '+380987654321')
            .field('roomGeneration', JSON.stringify(roomGen))
            .attach('photos', path.join(fixturesDir, 'photo1.jpg'))
            .attach('photos', path.join(fixturesDir, 'photo2.jpg'))
            .expect(201);

        expect(res.body).toHaveProperty('id');
        dormitoryId = res.body.id;
    });

    it('GET /dormitories/:id → fetches dormitory by ID', async () => {
        const res = await agent.get(`/dormitories/${dormitoryId}`).expect(200);
        expect(res.body.id).toBe(dormitoryId);
    });

    it('PATCH /dormitories/:id → updates dormitory name', async () => {
        const res = await agent
            .patch(`/dormitories/${dormitoryId}`)
            .send({ name: 'Updated Dorm Name' })
            .expect(200);
        expect(res.body.name).toBe('Updated Dorm Name');
    });

    it('PATCH /dormitories/:id/deactivate → deactivates dormitory', async () => {
        const res = await agent
            .patch(`/dormitories/${dormitoryId}/deactivate`)
            .expect(200);
        expect(res.body.status).toBe('NotActive');
    });

    it('POST /announcements → creates announcement', async () => {
        const res = await agent
            .post('/announcements')
            .send({
                title: 'Test Announcement',
                content: 'This is a test',
                expiresAt: new Date(Date.now() + 86400000).toISOString(),
                attachmentUrls: [],
                forEveryone: true,
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        announcementId = res.body.id;
    });

    it('GET /announcements → returns all announcements', async () => {
        const res = await agent.get('/announcements').expect(200);
        expect(res.body.find((a: any) => a.id === announcementId)).toBeDefined();
    });

    it('GET /announcements/:id → fetches announcement by ID', async () => {
        const res = await agent
            .get(`/announcements/${announcementId}`)
            .expect(200);
        expect(res.body.id).toBe(announcementId);
    });

    it('PATCH /announcements/:id → updates announcement', async () => {
        const res = await agent
            .patch(`/announcements/${announcementId}`)
            .send({ title: 'Updated Title' })
            .expect(200);
        expect(res.body.title).toBe('Updated Title');
    });

    it('DELETE /announcements/:id → soft deletes announcement', async () => {
        const res = await agent
            .delete(`/announcements/${announcementId}`)
            .expect(200);
        expect(res.body.isHidden).toBe(true);
    });

    it('GET /rooms/avalible → returns available rooms', async () => {
        const res = await agent
            .get('/rooms/avalible')
            .query({ from: '2025-08-01', to: '2025-08-10' })
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
            roomId = res.body[0].id;
        }
    });

    it('POST /rooms/request-accommodation → creates accommodation request', async () => {
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
