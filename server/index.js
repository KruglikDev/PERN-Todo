const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./db');

//Middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES
//create a todo
app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body;
        //insert into _todo table in description column, $1 is a variable, value in [] is a value of a
        //variable
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {description} = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated");
    } catch (err) {
        console.log(err.message);
    }
})

//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])

        res.json("Todo was deleted");
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(5000, () => {
    console.log("Server has started at port 5000");
})