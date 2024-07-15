// need to test ADDING, REMOVING, UPDATING, and FINDING items in database.

import { MongoClient } from 'mongodb'
import router from '../routes/record.js'
import request from 'supertest'

describe('Adding items to database', () => {
    let connection;
    let db;
    const uri = "mongodb://localhost:27017/"

    beforeAll(async () => {
        connection = await MongoClient.connect(uri);
        db = await connection.db('test');
        await db.collection('users').deleteMany({});
    });

    afterAll(async () => {
        await connection.close();
    });

    describe('Adding users', () => {
        test('Adding a new user', async () => {
            const users = db.collection('users')
            const newUser = {
                name: "Al Anwar",
                username: "alamanwar",
                email: "alamanwar@ufl.edu",
                password: "Fuck you."
            }
            
            await users.insertOne(newUser);
            const insertedUser = await users.findOne({ name: "Al Anwar" });
            expect(insertedUser).toEqual(newUser);
            
            // const response = await request(router).post('/').send(newUser);
            // expect(response.statusCode).toBe(500);
        })
    })
});