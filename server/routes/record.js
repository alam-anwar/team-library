import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Find all records.
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Find a single record by ID.
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Creates a record in the database.
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

// Updates a record in the database by ID.
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },
        };

        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

// Deletes a record in the database.
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

// BELOW THIS POINT --- TURNING GET/POST/PATCH/DELETE CALLS
// INTO THEIR OWN FUNCTIONS SO THEY CAN BE USED IN SERVER.JS

// !!! DO NOT DELETE ANYTHING ABOVE THIS COMMENT! !!!
// !!! THOSE CALLS ARE STILL LOAD BEARING !!!

const findAllItems = async () => {
    let collection = await db.collection("items");
    let results = await collection.find({}).toArray();
    return results;
}

const findAllUsers = async () => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    return results;
}

const findAllEvents = async () => {
    let collection = await db.collection("events");
    let results = await collection.find({}).toArray();
    return results;
}

const findOne = async (coll) => {
    let collection = await db.collection(coll);
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    
    return (!result) ? -1 : result;
}

const findOneItem = async () => {
    return await findOne("items");
}

const findOneUser = async () => {
    return await findOne("users");
}

const findOneEvent = async () => {
    return await findOne("events");
}

const initializeTestDatabase = async () => {
    try {
        if (process.env.NODE_ENV != "test") {
            throw new Error("initializeTestDatabase() called, but you are not in a testing environment.")
        }

        let userTest = await db.collection("users-test");
        await userTest.insertOne({
            name: "Al Anwar",
            email: "al@ufl.edu",
            username: "alamanwar",
            permission: "admin"
        });
        await userTest.insertOne({
            name: "Abbhinav Sriram",
            email: "abbhinav@ufl.edu",
            username: "abbhinavsriram",
            permission: "member"
        });
        await userTest.insertOne({
            name: "Robert Schneeberger",
            email: "robert@ufl.edu",
            username: "robertschneeberger",
            permission: "admin"
        });
        await userTest.insertOne({
            name: "Ryan Greene",
            email: "ryan@ufl.edu",
            username: "ryangreene",
            permission: "employee"
        });

        let itemTest = await db.collection("items-test");
        await itemTest.insertOne({
            name: "Harry Potter and the Sorcerer's Stone",
            author: "J. K. Rowling"
        });
        await itemTest.insertOne({
            name: "Catch 22",
            author: "Joseph Hellerd"
        });
        await itemTest.insertOne({
            name: "The Great Gatsby",
            author: "F. Scott Fitzgerald"
        });
        await itemTest.insertOne({
            name: "The Count of Monte Cristo",
            author: "Alexandre Dumas"
        });

        let eventTest = await db.collection("events-test");
        await eventTest.insertOne({
            name: "Ryan Finally Attends Discussion",
            date: "08/01/2029",
            location: "Malachowsky 2001"
        });
    } catch(err) {
        console.log(err);
    }
}

// const addItem = async (coll, item) => {
//     try {
//         // assuming the item was deemed valid in server.js
//         let collection = await db.collection(coll);
//         let result = await collection.insertOne(item);
//         return (!result) ? -1 : 1;
//     } catch (err) {
//         console.log("Error adding record! See below.");
//         console.error(err);
//     }
// }

// const updateItem = async (coll, item) => {
//     try {
//         const updates = {
//             $set: {
//                 name: req.body.name,
//                 position: req.body.position,
//                 level: req.body.level,
//             },
//         };
//         let collection = await db.collection("records");
//         let result = await collection.insertOne(newDocument);
//         return (!result) ? -1 : 1;
//     } catch (err) {
//         console.log("Error adding record! See below.");
//         console.error(err);
//     }
// }

export default {
    router, 
    findAllItems, findAllUsers, findAllEvents, 
    findOneItem, findOneUser, findOneEvent,
    initializeTestDatabase
};