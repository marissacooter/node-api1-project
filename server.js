const express = require("express") 
const db = require("./database")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Here's my Node API 1 Project :) "})
})

server.get("/users", (req, res) => {
    const users = db.getUsers()

    res.json(users)
})

server.listen(8080, () => {
    console.log("[ SERVER RUNNING ON PORT 8080 ... ]")
})