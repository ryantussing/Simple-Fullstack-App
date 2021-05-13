const express = require('express')
const sqlite3 = require('sqlite3')
const path = require('path')
const app = new express()
const db = new sqlite3.Database('./db/todo.db', (err) => {
    if (err) {
        console.error(err.message)
    }
    else {
        console.log('Connected to db')
        console.log(__dirname)
    }
})
let user_id
let new_user

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.post("/login", (req, res) => {
    const user = req.body
    const sql2 = "SELECT id FROM users WHERE username = ? AND password = ?"
    db.all(sql2,[user.username, user.password],(err, rows) => {
        if (rows && rows.length > 0) {
            res.send({
                loggedIn: true,
                message: "Successful login!",
                newUser: false,
                userID: rows[0],
                username: user.username
            })
            new_user = false
            user_id = rows[0]
            console.log(user_id.id)
        }   else {
                if (user.username.length >= 4 && user.password.length >= 4) {
                    const sql = "INSERT INTO users (username, password) VALUES (?,?)"
                    db.run(sql,[user.username, user.password], function (err) {
                        if (err) console.error(err)
                        console.log(this)
                        res.send({
                            loggedIn: true,
                            message: "Your account was successfully created.",
                            newUser: true,
                            userID: this.lastID,
                            username: user.username
                        })
                        new_user = true
                        user_id = this.lastID
                        console.log(user_id)
                    })
                }   else {
                        res.status(401)
                        res.send({
                            loggedIn: false,
                            message: "Username or password is invalid. Please enter a valid username and password. (Each must be greater than 4 characters)",
                        })
                    }
            }
    })
})

app.post("/addTasks", (req,res) => {
    const payload = req.body
    const sql = "INSERT INTO solo_tasks (user_id, content) VALUES (?,?)"
    if (payload.content.length > 0) {
        db.all(sql,[payload.user_id, payload.content],(err, rows) => {
            res.send({
                message: "New task successfully added to solo_tasks."
            })
        })
    } else {
        // alert("Please add text to your new task.")
        res.send({
            message: "Please add text to your new task.",
            tooShort: true
        })
    }
})

app.post("/removeTasks", (req,res) => {
    const payload = req.body
    const sql = "DELETE FROM solo_tasks WHERE solo_tasks.id = ?"
        db.all(sql,[payload.solo_task_id],(err, rows) => {
            res.send({
                message: "Task successfully deleted from solo_tasks."
            })
        })
})

app.get("/loadTasks", (req,res) => {
    const sql = "SELECT content, id FROM solo_tasks WHERE solo_tasks.user_id = ?;"
    if (new_user) {
        db.all(sql,[user_id],(err, rows) => {
            if (rows && rows.length > 0) {
                console.log("Rows exist on the /loadTasks get request. new_user option was run.")
                res.send(rows)
            } else {console.log("Rows were not found on the /loadTasks get request. new_user option was run.")}
        })
    } else if (!new_user) {
        db.all(sql,[user_id.id],(err, rows) => {
            if (rows && rows.length > 0) {
                console.log("Rows exist on the /loadTasks get request. !new_user option was run.")
                res.send(rows)
            } else {console.log("Rows were not found on the /loadTasks get request. !new_user option was run.")}
        })
    } else {console.error()}
})

app.listen(3000, () => console.log("Server started"))