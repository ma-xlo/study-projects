import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Todo = new Schema ({ 
    task: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    hour: {
        type: String,
    },
	date: {
        date: String,
    } 
});

mongoose.model('todo', Todo);
