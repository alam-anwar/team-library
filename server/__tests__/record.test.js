// ADDING ITEMS TO THE DATABASE

// REMOVING ITEMS FROM THE DATABASE

// FINDING ITEMS IN THE DATABASE

import { MongoClient } from 'mongodb'

describe('Adding items to database', () => {
    let connection;
    let db;
    const uri = "mongodb://localhost:27017"

    beforeAll(async () => {
        connection = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        });
        db = await connection.db('test');
        await db.collection('users').deleteMany({});
    });

    afterAll(async () => {
        await connection.close();
    });

    describe('Adding users', () => {
        test('Adding a new user', async () => {
            const users = db.collection('users');

            const newUser = {
                name: "Al Anwar",
                username: "alamanwar",
                email: "alamanwar@ufl.edu",
                password: "Fuck you."
            }
            await users.insertOne(newUser);

            const insertedUser = await users.findOne({ name: "Al Anwar" });
            expect(insertedUser).toEqual(newUser);
        })
    })
});