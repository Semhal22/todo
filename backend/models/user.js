const mongoose = require('mongoose');
// const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);


// function validateTodo(todo){
//     const schema = {
//         task: Joi.string().required(),
//         completed: Joi.boolean().required()
//     }
//     const {error} = Joi.validate(todo,schema);
//     return error;
// }

module.exports = User;
// module.exports.validate = validateTodo;