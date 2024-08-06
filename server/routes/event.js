import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Find all events.
router.get("/", async (req, res) => {
    let collection = await db.collection("events");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Find a single event by ID.
router.get("/:id", async (req, res) => {
    let collection = await db.collection("events");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Creates an event in the database.
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            description: req.body.description,
            imageLink: req.body.imageLink,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            location: req.body.location,
            approved: req.body.approved,
        };
        let collection = await db.collection("events");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding event");
    }
});

// Updates a event in the database by ID.
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: req.body
        };

        let collection = await db.collection("events");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating event");
    }
});

// Deletes a event in the database.
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("events");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting event");
    }
});

export default {router};