import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import User from '../models/user.model.js';

describe('Auth Routes', () => {
    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        fullName: 'Test User',
        password: 'password123',
    };

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.user.username).toBe(testUser.username);
            expect(response.body.data.user.email).toBe(testUser.email);
            expect(response.body.data.accessToken).toBeDefined();

            const userInDb = await User.findOne({ email: testUser.email });
            expect(userInDb).toBeDefined();
            expect(userInDb.username).toBe(testUser.username);
        });

        it('should fail if required fields are missing', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({ username: 'onlyusername' });

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            // First register the user
            await request(app).post('/api/auth/register').send(testUser);

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    username: testUser.username,
                    password: testUser.password,
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.accessToken).toBeDefined();
        });

        it('should fail with incorrect password', async () => {
            await request(app).post('/api/auth/register').send(testUser);

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    username: testUser.username,
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(401);
        });
    });
});
