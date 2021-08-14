require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors =require('cors');
// app.use(cors(corsOptions))
app.use(express.static('public'));

const connectDB = require('./config/db');
connectDB();

//cors
const corsOption = {
    origin :process.env.ALLOWED_CLIENTS.split(',')
}
app.use( cors (corsOption) );

app.use(express.json());
//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index')
})
// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));