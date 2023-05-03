const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todo');
const User = require('../models/user');
const auth = require('../middleware/auth');


router.get('/',auth, async(req,res) => {
    const userId= req.user._id;
    const todos = await Todo.find({user:userId}).populate('user');
    res.send(todos);
})

router.post('/', async(req,res) => {
    try{
        // const error = validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
        const todo = new Todo(_.pick(req.body, ['task', 'completed','editing','user']));

        await todo.save();
        res.send(todo);
    }catch(ex){
        console.log(ex.message);
    } 
})

router.put('/:id', async(req,res) => {
    try{
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).send('There is no todo with the given id');

        todo = await Todo.findByIdAndUpdate(req.params.id, {
            $set: {
                task: req.body.task,
                completed: req.body.completed
            }
        }, { new: true })
        res.send(todo);
    }catch(ex){
        console.log(ex);
    }
    
})
router.patch('/checkAll', async(req,res) => {
    try{
        const result = await Todo.updateMany({editing: false},{
            completed: req.body.completed
        })
        res.send(result);
    }catch(ex){
        console.log(ex.message);
    }
})
router.delete('/:id', async(req,res) => {
    try{
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).send('There is no todo with the given id');

        todo = await Todo.findOneAndDelete({_id: req.params.id}, {useFindAndModify:false})
        res.send(todo);
    }catch(ex){
        console.log(ex);
    }
})   
// router.get('/deleteCompleted', async(req,res)=> {
//     try{
//         console.log(req.body);
//         const result = await Todo.({_id: {$in: ['637c35af00782c430ce7a617','637c35af00782c430ce7a615']}})
//         res.send(result);
//     }catch(ex){
//         console.log(ex);
//     }
// })

module.exports = router;