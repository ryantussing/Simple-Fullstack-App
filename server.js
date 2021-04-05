const express = require('express')
const sqlite3 = require('sqlite3')
const app = new express()
const db = new sqlite3.Database('./db/todo.db', (err) => {
    if (err) {
        console.error(err.message)
    }
    else {
        console.log('Connected to todo.db')
    }
})

app.use(express.static('public'))
app.use(express.json())
app.listen(3000, () => console.log("Server started"))

app.get("/", (req,res) => {
    const sql = "SELECT * FROM solo_tasks;"
    db.all(sql,[],(err, rows) => {
        res.send(rows)
    })
})

// app.get("/lists", (req,res) => {
//     const sql = "SELECT * FROM lists;"
//     db.all(sql,[],(err, rows) => {
//         res.send(rows)
//     })
// })
// NEED TO FIGURE OUT HOW TO JOIN lists AND list_tasks IN THE ABOVE GET REQUEST => JOIN TABLES
// const sql = "SELECT * FROM lists INNER JOIN list_tasks ON lists.id = list_tasks.list_id WHERE lists.user_id = users.id;"

// app.post("/solotasks", (req,res)=> {
//     const task = req.body;
//     //3.2.1. verify the post is not 0 characters long
//     if (task.text.length > 0) {
//         //3.2.2. add to posts array if valid
//         const sql = "INSERT INTO tasks (content, user_id) VALUES (?,?);"
//         db.run(sql,[task.text,task.user_id])
//         //3.2.3. send response 'New task successfully saved.'
//         res.send({
//             message: "Task successfully saved"
//         })
//     }
//     //3.2.4. if invalid send error response
//     else {
//         res.status(401)
//         res.send({
//             message: "Task is not long enough."
//         })
//     }
// })

// app.post("/lists", (req,res)=> {
//     const title = req.body;
//     //3.2.1. verify the post is not 0 characters long
//     if (title.text.length > 0) {
//         //3.2.2. add to posts array if valid
//         const sql = "INSERT INTO lists (list_title, user_id) VALUES (?,?);"
//         db.run(sql,[title.text,title.user_id])
//         //3.2.3. send response 'New task successfully saved.'
//         res.send({
//             message: "List successfully saved"
//         })
//     }
//     //3.2.4. if invalid send error response
//     else {
//         res.status(401)
//         res.send({
//             message: "List is not long enough."
//         })
//     }
// })