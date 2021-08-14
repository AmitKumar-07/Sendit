require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.static('public'));

//for mongodb-connection setup
const connectDB = require('./config/db');
connectDB();

// express don't know about json data so when we recieve json data we have to tell express about  json data;
app.use(express.json());

//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// for the home page
app.get('/',(req,res)=>{
    res.render('index')
})

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));