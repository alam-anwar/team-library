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

// TC-01: Verify registration input validation on the login/register screen

// import request from 'supertest'; <--- Start of server.test.js file
// import app from '../server.js'; <--- Start of server.test.js file

describe('Login/Register Validation', () => {
    test.only('Invalid username should return error', async () => {
        const response = await request(app).post('/register').send({
            username: 'user@invalid',
            email: 'user@example.com',
            password: 'P@ssw0rd123'
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid username');
    });
});


// TC-02: Verify functioning RSVP functionality for events by users

describe('RSVP Functionality', () => {
    test('Submit RSVP request', async () => {
        const response = await request(app).post('/rsvp').send({
            userId: 'user1',
            eventId: '101'
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('RSVP successful');
    });
});


// TC-03: Verify the proper display of checked-out items and search functionality on the user landing page

describe('User Landing Page', () => {
    test('Should display checked-out items and account details', async () => {
        const response = await request(app).get('/user/landing').query({
            userId: 'user1'
        });

        expect(response.status).toBe(200);
        expect(response.body.checkedOutItems).toBeDefined();
        expect(response.body.accountDetails).toBeDefined();
    });

    test('Should return accurate search results', async () => {
        const response = await request(app).get('/user/search').query({ keyword: 'Harry Potter' });

        expect(response.status).toBe(200);
        expect(response.body.results).toBeInstanceOf(Array);
        response.body.results.forEach(item => {
            expect(item.title).toMatch(/Harry Potter/i);
        });
    });
});


// TC-04: Verify the proper creation and deletion of inventory items by employees and admins

describe('Inventory Management', () => {
    test('Create new inventory item', async () => {
        const response = await request(app).post('/record').send({
            name: 'New Book',
            position: 'Shelf 1',
            level: 'Available'
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Record created successfully');
    });

    test('Prevent deletion of checked-out item', async () => {
        const checkedOutItemId = '60b8d295e1d3e81e9c6c1a72';
        const response = await request(app).delete(`/record/${checkedOutItemId}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Cannot delete checked-out item');
    });
});


// TC-05: Verify the proper modification of inventory items by employees and admins

describe('Modify Inventory Items', () => {
    test('Update inventory item details', async () => {
        const itemId = '60b8d295e1d3e81e9c6c1a73';
        const response = await request(app).patch(`/record/${itemId}`).send({
            name: 'Updated Book Title',
            position: 'Shelf 2',
            level: 'Available'
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Record updated successfully');
    });
});


// TC-06: Verify the checkout request process for users

describe('User Checkout Requests', () => {
    test('Submit checkout request', async () => {
        const response = await request(app).post('/checkout').send({
            userId: 'user1',
            itemId: '60b8d295e1d3e81e9c6c1a74'
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Checkout request submitted');
    });
});


// TC-07: Verify the processing of return requests by employees and admins

describe('Processing Returns', () => {
    test('Process return request', async () => {
        const returnRequestId = '60b8d295e1d3e81e9c6c1a75';
        const response = await request(app).post(`/return/${returnRequestId}`).send();

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Return processed successfully');
    });
});


// TC-08: *** Needs to be split up into multiple tests ***
