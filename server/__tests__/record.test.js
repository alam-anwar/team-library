import records from "../routes/record.js"

/**
 * 
 * yes, the data that's being entered in here isn't representative of the
 * actual data format that's being used for the production app. however,
 * seeing how the data checking is happening on the server side of the application,
 * we can't really do that checking here.
 * 
 */

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
        })

        test("Ensure there are four users in the database", async () => {
            const num = await records.numUsers();
            expect(num).toBe(4);    
        });

        test("accessing Ryan in database", async () => {
            const ryan = await records.findOneUser({
                name: "Ryan Greene"
            });
            expect(ryan.email).toBe("ryan@ufl.edu");
            expect(ryan.username).toBe("ryangreene");
            expect(ryan.permission).toBe("employee");
        });

        test("accessing Robert in database", async () => {
            const robert = await records.findOneUser({
                name: "Robert Schneeberger"
            });
            expect(robert.email).toBe("robert@ufl.edu");
            expect(robert.username).toBe("robertschneeberger");
            expect(robert.permission).toBe("admin");
        });

        test("accessing Abbhinav in database", async () => {
            const abbhinav = await records.findOneUser({
                name: "Abbhinav Sriram"
            });
            expect(abbhinav.email).toBe("abbhinav@ufl.edu");
            expect(abbhinav.username).toBe("abbhinavsriram");
            expect(abbhinav.permission).toBe("member");
        });

        test("accessing Al in database", async () => {
            const al = await records.findOneUser({
                name: "Al Anwar"
            });
            expect(al.email).toBe("al@ufl.edu");
            expect(al.username).toBe("alamanwar");
            expect(al.permission).toBe("admin");
        });

    });

    describe("Find items", () => {

        test("findAllItems returns something", async () => {
            const result = await records.findAllItems();
            expect(result).toBeDefined();
        });

        test("Ensure there are four books", async () => {
            const num = await records.numItems();
            expect(num).toBe(4);
        });

        test("accessing Harry Potter, exact name", async () => {
            const potter = await records.findOneItem({
                name: "Harry Potter and the Sorcerer's Stone"
            });
            expect(potter.author).toBe("J. K. Rowling");
        });

        // test("accessing Harry Potter, partial name", async () => {
        //     const potter = await records.findOneItem({
        //         name: "Harry Potter and th"
        //     });
        //     expect(potter.author).toBe("J. K. Rowling");
        // });

        test("accessing Catch 22, exact name", async () => {
            const catch22 = await records.findOneItem({
                name: /Catch 22/
            });
            expect(catch22.author).toBe("Joseph Hellerd");
        });

        // test("accessing Catch 22, partial name", async () => {
        //     const catch22 = await records.findOneItem({
        //         name: "Catc"
        //     });
        //     expect(catch22.author).toBe("Joseph Hellerd");
        // });

        test("accessing The Great Gatsby, exact name", async () => {
            const gatsby = await records.findOneItem({
                name: "The Great Gatsby"
            });
            expect(gatsby.author).toBe("F. Scott Fitzgerald");
        });

        // test("accessing The Great Gatsby, partial name", async () => {
        //     const gatsby = await records.findOneItem({
        //         name: "The Gre"
        //     });
        //     expect(gatsby.author).toBe("F. Scott Fitzgerald");
        // });

        test("accessing The Count of Monte Cristo, exact name", async () => {
            const cristo = await records.findOneItem({
                name: "The Count of Monte Cristo"
            });
            expect(cristo.author).toBe("Alexandre Dumas");
        });

        // test("accessing The Count of Monte Cristo, partial name", async () => {
        //     const cristo = await records.findOneItem({
        //         name: "ount of Mont"
        //     });
        //     expect(cristo.author).toBe("Alexandre Dumas");
        // });

    });

    describe("Find events", () => {
        
        test("findAllEvents returns something", async () => {
            const events = await records.findAllEvents();
            expect(events).toBeDefined();
        });

        test("Ensure there's only one event", async () => {
            const num = await records.numEvents();
            expect(num).toBe(1);
        });

        test("Accessing Ryan event's date and location", async() => {
            const ryanDiscussion = await records.findOneEvent({
                name: "Ryan Finally Attends Discussion"
            });
            expect(ryanDiscussion.date).toBe("08/01/2029");
            expect(ryanDiscussion.location).toBe("Malachowsky 2001");
        });
    
    });

});

describe("Add functions", () => {

    describe("Adding users", () => {

        test("Add Donald as user", async () => {
            const donald = {
                name: "Donald Honeycutt",
                email: "idk@ufl.edu",
                username: "iDoNotLikeHoney",
                permission: "member"
            };
            const result = await records.addOneUser(donald);
            expect(result.acknowledged).toBe(true);
        });

    });

    describe("Adding items", () => {

        test("Add 1984 - George Orwell", async() => {
            const orwell = {
                name: "1984",
                author: "George Orwell"
            };
            const result = await records.addOneItem(orwell);
            expect(result.acknowledged).toBe(true);
        });

        test("Add Meditations - Marcus Aurelius", async () => {
            const meditations = {
                name: "Meditations",
                author: "Marcus Aurelius"
            };
            const result = await records.addOneItem(meditations);
            expect(result.acknowledged).toBe(true);
        });

        test("Add The Art of War - Sun Tzu", async () => {
            const war = {
                name: "The Art of War",
                author: "Sun Tzu"
            };
            const result = await records.addOneItem(war);
            expect(result.acknowledged).toBe(true);
        });

    });

    describe("Adding events", () => {

        test("Adding Sprint 2 Presentation", async () => {
            const pres = {
                name: "Sprint 2 Presentation",
                date: "08/06/2024",
                location: "Zoom"
            };
            const result = await records.addOneEvent(pres);
            expect(result.acknowledged).toBe(true);
        })

    });

});