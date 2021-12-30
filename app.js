const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 7878; 
const dbConfig = require('./config/db.config');
const crudOp = require('./routes/crudRoute');
const authOp = require('./routes/authRoute');
const mongoose = require('mongoose'); 

// Configuring Express App
const app = express();

// Configuring Express Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cors());

// Routes Configuration
app.use('/api',crudOp);
app.use('/api-auth',authOp);

// Connection for the database
mongoose.Promise = global.Promise; 
mongoose.connect(dbConfig.url,{
   useNewUrlParser:true 
}).then(()=>{
    console.log("Successfully Connected To The Database")
}).catch(err=>{
    console.log('Could Not Connect to the Database',err)
    process.exit();
});

// PORT configuration
app.listen(port,()=>{
    console.log(`Listening to ${port}`);
});