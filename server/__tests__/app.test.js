import supertest from 'supertest'
import app from '../app.js'
import { request } from 'express'

describe("Example tests", () => {
    describe("Addition", () => {
        test("1 + 1 = 2", () => {
            expect(1 + 1).toBe(2)
        })
    })
})