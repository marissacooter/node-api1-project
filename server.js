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

server.post("/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name
    })

    res.status(201).json(newUser)
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(req.params.id)

        res.status(200).json("success!")
    } else {
        res.status(404).json({ 
            message: "Error, User not found",
        })
    }
})

server.put("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    const updatedUser = db.updateUser({
        name: req.body.name
    })

    res.status(201).json(updatedUser)
})

server.listen(8080, () => {
    console.log("[ SERVER RUNNING ON PORT 8080 ... ]")
})