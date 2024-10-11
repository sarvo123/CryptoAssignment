const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
const cryptoData = require('./models/cryptoData');
const connectToDb = require('./db/connectToDb');
const serverRoutes =  require('./routes/serverRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


// building server ...
const app = express();

// middlewares ...
app.use(cors());
app.use(bodyParser.json());
dotenv.config();


const PORT = process.env.PORT || 3000 ;



app.get("/" , (req , res)=>{
    res.send("Hello World !");
})

app.use("/api/servers", serverRoutes);


app.listen(PORT , ()=>{
    connectToDb();
    console.log(`server is working on PORT ${PORT}`);
});