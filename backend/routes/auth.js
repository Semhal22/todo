const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async(req,res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status('401').send('Invalid email!!!');

        const validPwrd = await bcrypt.compare(req.body.password, user.password);
        if(!validPwrd) return res.status(401).send('Invalid password!!!');

        const access_token = jwt.sign({_id: user._id, name: user.name}, config.get('jwtPrivateKey'));

        const token = {
            id: user._id,
            access_token: access_token
        }
        res.header('auth', token.access_token).send(token);

    }catch(ex){
        console.log(ex.message);
    }
})

module.exports = router;