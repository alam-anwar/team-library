// need to test ADDING, REMOVING, UPDATING, and FINDING items in database.

import { MongoClient } from 'mongodb'
import router from '../routes/record.js'
import {app, server} from '../server.js'
import request from 'supertest'

// const request = supertest(app);
// beforeAll( async () => {
//     const client = connectDB();
// });

// afterAll( async () => {
//     disconnectDB();
//     app.close(); // this might be an error...
// });

describe('Adding items to database', () => {

    describe('Initial test cases', () => {

        test('Example request using mock database', async () => {
            const response = await request(app).get('/').send({});
            expect(response.statusCode).toBe(200);
            
            // const users = db.collection('users')
            // const newUser = {
            //     name: "Al Anwar",
            //     username: "alamanwar",
            //     email: "alamanwar@ufl.edu",
            //     password: "Fuck you."
            // }
            
            // await users.insertOne(newUser);
            // const insertedUser = await users.findOne({ name: "Al Anwar" });
            // expect(insertedUser).toEqual(newUser);
            
            // const response = await request(router).post('/').send(newUser);
            // expect(response.statusCode).toBe(500);
        }, 15000)
    
    })

})