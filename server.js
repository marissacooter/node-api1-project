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

server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({
            message: "Error, User not found"
        })
    }
})

server.listen(8080, () => {
    console.log("[ SERVER RUNNING ON PORT 8080 ... ]")
})