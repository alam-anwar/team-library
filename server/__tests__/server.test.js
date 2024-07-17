import request from 'supertest'
import app from '../server.js'

describe('Finding items in database', () => {

    describe('Finding all items', () => {



    });

    describe('Finding one item', () => {

        

    });

});

describe('Adding to database', () => {

    describe('Adding items', () => {

        test('Example request using mock database', async () => {
            const response = await request(app).get('/').send({
                name: "test",
                position: "test",
                level: "test"
            });

            expect(response.status).toBe(200);
        });

    });

});

describe('Updating item in database', () => {

});

describe('Removing item from database', () => {

});