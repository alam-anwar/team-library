import records from "../routes/record.js"

beforeAll(() => {
    return records.initializeTestDatabase();
});

afterAll(() => {
    return records.tearDownTestDatabase();
});

describe("Find functions", () => {

    describe("Find users", () => {

        test("findAll returns SOMETHING", async () => {
            const results = await records.findAllUsers();
            expect(results).toBeDefined();
            console.log(results);
        })

        test.only("Ensure there are four users in the database", async () => {
            let num = records.numUsers();
            expect(num).toBe(4);    
        });

        test("accessing Ryan in database", () => {
            const ryan = records.findOneUser({
                name: "Ryan Greene"
            });
            expect(ryan.email).toBe("ryan@ufl.edu");
            expect(ryan.username).toBe("ryangreene");
            expect(ryan.email).toBe("employee");
        });

        test("accessing Robert in database", () => {
            const robert = records.findOneUser({
                name: "Robert Schneeberger"
            });
            expect(robert.email).toBe("robert@ufl.edu");
            expect(robert.username).toBe("robertschneeberger");
            expect(robert.email).toBe("admin");
        });

        test("accessing Abbhinav in database", () => {
            const abbhinav = records.findOneUser({
                name: "Abbhinav Sriram"
            });
            expect(abbhinav.email).toBe("abbhinav@ufl.edu");
            expect(abbhinav.username).toBe("abbhinavsriram");
            expect(abbhinav.email).toBe("member");
        });

        test("accessing Al in database", () => {
            const al = records.findOneUser({
                name: "Al Anwar"
            });
            expect(al.email).toBe("al@ufl.edu");
            expect(al.username).toBe("alamanwar");
            expect(al.email).toBe("admin");
        });

    })

})