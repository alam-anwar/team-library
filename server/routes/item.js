import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /item.
const router = express.Router();

// Find all items.
router.get("/", async (req, res) => {
    let collection = await db.collection("items");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Find a single item by ID.
router.get("/:id", async (req, res) => {
    let collection = await db.collection("items");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Creates an item in the database.
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            genre: req.body.genre,
            copyNum: req.body.copyNum,
            versions: req.body.versions,
            type: req.body.type,
        };
        let collection = await db.collection("items");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding item");
    }
});

// Updates an item in the database by ID.
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: req.body
        };

        let collection = await db.collection("items");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating item");
    }
});

// Deletes an item in the database.
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("items");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting item");
    }
});

export default {router};