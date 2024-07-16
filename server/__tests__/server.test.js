import request from 'supertest'
import app from '../server.js'

describe("Example tests", () => {
    describe("Addition", () => {
        test("1 + 1 = 2", () => {
            expect(1 + 1).toBe(2)
        })
    })
})

describe("POST /test", () => {
    
    describe("when the user provides a username and password", () => {
        
        test("server should respond with a 200 code", async () => {
            const response = await request(app).post("/test").send({
                username: "username",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        })

    })

})

describe('Adding items to database', () => {

    describe('Initial test cases', () => {
        test('Example request using mock database', async () => {
            const response = await request(app).post('/').send({
                name: "test",
                position: "test",
                level: "test"
            });

            expect(response.status).toBe(204);
            
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
});