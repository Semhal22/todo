const mongoose = require('mongoose');
const User = require('./user');
// const Joi = require('joi');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    editing: {
        type: Boolean,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));

// function validateTodo(todo){
//     const schema = {
//         task: Joi.string().required(),
//         completed: Joi.boolean().required()
//     }
//     const {error} = Joi.validate(todo,schema);
//     return error;
// }

module.exports.Todo = Todo;
// module.exports.validate = validateTodo;