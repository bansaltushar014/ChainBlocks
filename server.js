const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
var fetch = require("./fetch");
var cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;


mongoose.connect('mongodb://749c317d-0ee0-4-231-b9ee:rfWUGy5rJc3VwS3V4ix2QXPr4lOPH3CVu0umSeUUVhkx6lMl3ift7386Ksitg8UacVY66KMubB1KQQRcUphxaA%3D%3D@749c317d-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true',
 { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); 
});
// This is used to give cross origin requests
app.use(cors({origin:"*"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', fetch.data);

// app.get('/', (req,res, next)=>{
//   res.send('working');
// //   db.collection("customers").find(function(err, result) {
// //     if (err) return next(err);
// //     res.send(result);
// // })
// })

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));