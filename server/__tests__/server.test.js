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

    // if the user is creating an account:

        // 

})