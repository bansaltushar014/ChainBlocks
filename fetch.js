const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let dataSchema = new Schema({
  name: {type: String, required: true, max: 100},
  address: {type: String, required: true},
  
});

const pdata = mongoose.model('customers', dataSchema);
// var dataSchema = { name: "Company2 Inc", address: "Highway 22" };

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
