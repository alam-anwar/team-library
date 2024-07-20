import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records.router);

// we still need to test the findAll() function,
// but as this stands this makes the test case in server.test.js
// work.

app.get('/', (req, res) => {
    res.send(records.findAll()).status(200);
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