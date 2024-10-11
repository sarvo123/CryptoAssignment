const mongoose = require('mongoose');

const cryptoDataSchema = new mongoose.Schema({
    coin : String , 
    price : Number , 
    marketCap : Number ,
    change24th : Number ,
    timestamp : {
        type : Date ,
        default  : Date.now
    }
});

const cryptoData = mongoose.model('cryptoData' , cryptoDataSchema);
module.exports = cryptoData ; 