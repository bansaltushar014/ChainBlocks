const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let dataSchema = new Schema({
  name: {type: String, required: true, max: 100},
  address: {type: String, required: true},
  
});

const pdata = mongoose.model('customers', dataSchema);
// var dataSchema = { name: "Company2 Inc", address: "Highway 22" };

// mongoose connection ,, url is random url 
// mongoose.connect('mongodb://tusharbansal:tushar.12@ds135234.mlab.com:35234/vidjot', { useNewUrlParser: true });
mongoose.connect('mongodb://749c317d-0ee0-4-231-b9ee:rfWUGy5rJc3VwS3V4ix2QXPr4lOPH3CVu0umSeUUVhkx6lMl3ift7386Ksitg8UacVY66KMubB1KQQRcUphxaA%3D%3D@749c317d-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true',
 { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Mongo Connection Succeeded."); 
});

// it was used once to create collection
// db.createCollection("customers", function(err, res) {
//   if (err) throw err;
//   console.log("Collection created!");
//   db.close();
// });

// var myobj = { name: "Company2 Inc", address: "Highway 22" };
// db.collection("customers").insertOne(myobj, function(err, res) {
//   if (err) throw err;
//   console.log("1 document inserted");
//   db.close();
// });


exports.data = function (req, res, next) {
    
      pdata.find(function (err, result) {
        if (err) return next(err);
        res.send(result);
    })

};
