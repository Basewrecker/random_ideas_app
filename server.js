const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;
const connectDB = require('./config/db');

connectDB();

const app = express();

// static folder 
app.use(express.static(path.join(__dirname, 'public'))); // makes public folder static 

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//cors middleware
app.use(cors({
    origin: ['http://localhost:4000/api/ideas','http://localhost:3000'],
    credentials: true,
}))

app.get('/', (req,res) => {
    res.json({message: 'welcome to the random ideas API'});
});


const ideaRouter = require('./routes/ideas');

app.use('/api/ideas', ideaRouter);

app.listen(port, () => console.log(`server listening on port ${port}`));