const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');

dotenv.config();

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 8080;

app.use('/api/v1/auth',authRoute);


app.get('/',(req,res)=>{

});

app.listen(8080,()=>{
    console.log('Server Started');
})