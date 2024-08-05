import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import items from "./routes/item.js";
import users from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/item", items.router);
app.use("/user", users.router);
app.use("/record", records.router);

// we still need to test the findAll() function,
// but as this stands this makes the test case in server.test.js
// work.

app.get('/', (req, res) => {
    res.send(records.findAll()).status(200);
});

app.post('/checkout', (req, res) => {
    const formData = req.body;
    console.log(formData);
    res.sendStatus(201);
});

// todo: fix
app.post('/register', (req, res) => {
    res.status(400).send({
        message: "Invalid username"
    });
});

// start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app