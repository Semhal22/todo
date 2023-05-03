const _ = require('lodash');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async(req,res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status('400').send('User already exists!!!');

        user = new User(_.pick(req.body, ['name', 'email','password']));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        res.send(_.pick(user, ['name', 'email']));
    }catch(ex){
        console.log(ex);
    } 
})

module.exports = router;