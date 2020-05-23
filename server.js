const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// mongoose connection ,, url is random url 
mongoose.connect('mongodb://tusharbansal:tushar.12@ds135234.mlab.com:35234/vidjot', { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); 
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));