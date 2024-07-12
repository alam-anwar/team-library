import express from "express"

const app = express()

app.post('/test', (req, res) => {
    res.send("Hello!")
})

export default app