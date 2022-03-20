"use strict";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "./models/todo.js";

const app = express();
const PORT = 3000;
const Todo = mongoose.model('todo');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to local Mongodb databases
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todo");
        console.log("Connected to databases");        
    } catch (error) {
        console.log("The connection with databases has failed");        
    }
}
connectDb();

// Create item
app.post('/create', async (req,res) => {
        
    const todo = {
        task: req.body.task,
        type: req.body.type,
        hour: req.body.hour,
        date: req.body.date
    }
    
    const checkDuplicate = await Todo.findOne({task: `${todo.task}`})
    if (todo.task !== checkDuplicate.task)  {

        try {
            await new Todo(todo).save()
            res.status(200).send("Todo created successfully");
        } catch (erro) {
            console.log(error);
            res.status(500).send("Error when trying to create todo");
        }
    } else {
        res.status(500).send("This todo already exists");
    }
});

// Read All
app.get("/read", async(req, res) => {
    const todos = await Todo.find();

    try {
        res.status(200).send(todos);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error when trying to get all todos");
    }
});

// Update item
app.patch("/update/:id", async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, req.body);
        // await Todo.save();
        res.status(200).send("Todo updated successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error when trying to update todo.");

    }
});

// Delete item
app.delete("/delete/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).send("Todo deleted successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error when trying to delete todo.");
    }
});

app.listen(PORT, console.log(`Server running at: http://localhost:${PORT}`));