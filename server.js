const express = require("express")

const db = require("./database.js")

const server = express()

server.use(express.json())

const shortid = require("shortid")

server.use(express.json())
server.get("/", (req, res) => {
    res.json({api: "HI"})
})

// POST REQUEST
server.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    })
    res.status(201).json(newUser)
    // res.send("working")

    if (!user) {
        return res.status(500).json({
            errorMessage: "There was an error while saving the user to the database."
        })
    }
})

// GET REQUEST
server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)

    if (!users) {
        return res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

// GET :ID REQUEST
server.get("/api/users/:id", (req, res) => {
    const user = db.getUserById(1)
    
    if (user) {
        res.send(user)
    } 
    elseif (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }

})

// DELETE REQUEST
server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)
        res.status(204).end()
    } elseif (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

// PUT REQUEST
server.put("/api/users/:id", (req, res) => {
    const updatedUser = db.getUserById(req.params.id)

    if(user) {
        db.updateUser(user.id, {
            name: req.body.name || user.name
        })
    
        res.status(201).json(updatedUser)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }

    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user."
        })
    } else (!updatedUser) {
        return res.status(500).json({
            message: "The user information could not be modified."
        })
    }
})

server.listen(8000, () => {
    console.log("server started on port 8000")
})