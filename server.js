const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);




/ old version (err) */
// var express = require('express'),
//     app = express(),
//     port = process.env.PORT || 3000,
//     bodyParser =require('body-parser'),
//     mongoose = require('mongoose');

// / username is chompusama and password is digio */
// mongoose.connect('mongodb+srv://chompusama:digio@wallet-nfc-elwkn.mongodb.net/test?retryWrites=true&w=majority', 
// function(err) {
//     if(err) throw err;
//     console.log('Connect to MongoDB success!')
// });


// //MongoDB Schema
// // var User = require('.api/models/userData');

// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());

// var routes = require('./api/routes/products');
// routes(app);

// app.listen(port);
// console.log('WalletNFC RESTful API server started on: ' + port);