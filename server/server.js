import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

app.post('/test', (req, res) => {
    res.send("hello");
})

// start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app