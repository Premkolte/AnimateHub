import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';

let mongoServer;

// Mock environment variables
process.env.JWT_SECRET = 'test_secret';
process.env.BCRYPT_SALT_ROUNDS = '1';
process.env.NODE_ENV = 'test';

// Mock email service to avoid sending real emails
vi.mock('../services/emailService.js', () => ({
    sendVerificationEmail: vi.fn().mockResolvedValue(true),
}));

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});
