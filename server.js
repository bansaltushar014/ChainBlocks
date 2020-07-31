const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
var fetch = require("./fetch");
var cors = require('cors');
const app = express();
const Schema = mongoose.Schema;
const port = process.env.PORT || 4000;
const path = require('path');
require('dotenv').config()


mongoose.connect(process.env.url,
 { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); 
});

app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/static', express.static(path.join(__dirname, './build/contracts')));

app.post('/api/postChainData', (req,res,next)=> {

  console.log(req.body);
  let chainData = new fetch.chainData();

  chainData.name = req.body.name;
  chainData.bookId = req.body.bookId;
  chainData.price = req.body.price;
  chainData.By = req.body.By;
  chainData.image = req.body.image;
  console.log("Inside postData!");
  console.log(chainData); 
  chainData.save(function(err, res) {
  if (err) throw err;
  console.log("1 document inserted");
  
  });
  res.send("done!");
});  

app.get('/api/getChainData', fetch.getChainData);


app.listen(port, () => console.log(`Listening on port ${port}`));