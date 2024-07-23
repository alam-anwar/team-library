import records from "../routes/record.js"

console.log(process.env.NODE_ENV);

beforeAll(async () => {
    return records.initializeTestDatabase();
});

describe("Find functions", () => {

    describe("findAll", () => {

        describe("findAll with users", () => {
        
            test("findAll returns all users", async () => {
                const response = await records.findAllUsers();
                expect(response).toBeDefined();
            })

        })

    })

})