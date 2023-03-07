const express = require ('express')
const mongoose = require ('mongoose')
let Movie = require ('./model/Movie.js');

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('');



app.listen(3013, () => console.log('Server runs on port 3013'))