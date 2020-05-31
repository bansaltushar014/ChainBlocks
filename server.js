const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
var fetch = require("./fetch");
var cors = require('cors');
const app = express();
const Schema = mongoose.Schema;
const port = process.env.PORT || 4000;



mongoose.connect('mongodb://749c317d-0ee0-4-231-b9ee:rfWUGy5rJc3VwS3V4ix2QXPr4lOPH3CVu0umSeUUVhkx6lMl3ift7386Ksitg8UacVY66KMubB1KQQRcUphxaA%3D%3D@749c317d-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true',
 { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); 
});


// it was used once to create collection
// db.createCollection("chainBook", function(err, res) {
//   if (err) throw err;
//   console.log("Collection created!");
//   db.close();
// });

// This is used to give cross origin requests
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

app.get('/', fetch.data);

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


app.post('/api/trial', (req,res) => {
  res.send(req.body);
})


// app.post('/api/post', (req, res) => {
//   console.log(req.body.post);
//   db.createCollection("chainBook", function (err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });

//   db.collection("chainBook").insertOne(req.body.post, function (err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });

// });

app.listen(port, () => console.log(`Listening on port ${port}`));