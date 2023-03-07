const express = require ('express')
const mongoose = require ('mongoose')

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb+srv://tamasmoser:y7BEOx4NjHD58U0M@cluster0.up3zpn0.mongodb.net/test');



app.listen(3013, () => console.log('Server runs on port 3013'))