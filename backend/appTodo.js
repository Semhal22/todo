const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config');
const todos = require('./routes/todos');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use(express.json());
app.use(cors());
app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/login', auth);

if(!config.get('jwtPrivateKey')){
    console.log('Error: PRIVATE KEY NOT SET');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/website',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => console.log('Successfully connected to MONGODB...'))
    .catch(err => console.log(err));

    

    app.listen(3000, ()=> console.log('Listening with port 3000'));