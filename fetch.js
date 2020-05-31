const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');




let dataSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  address: { type: String, required: true },

});

const pdata = mongoose.model('customers', dataSchema);




let chainBookSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  bookId: { type: String, required: true, max: 100 },
  price: { type: String, required: true, max: 100 },
  By: { type: String, required: true, max: 100 },
  image: { type: String, required: true, max: 100 },
})

const chainData = mongoose.model('chainBook1', chainBookSchema);

// var dataSchema = { name: "Company2 Inc", address: "Highway 22" };

// it was used once to create collection
// db.createCollection("chainBook", function(err, res) {
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

exports.getChainData = function (req, res, next) {
  chainData.find().lean().exec(function (err, result) {
    if (err) return next(err);
    res.send(result);
    var json = JSON.stringify(result);
    // write to a new file named 2pac.txt
    console.log(result);
    fs.writeFile('./src/randomData2.json', json, 'utf8', (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('Lyric saved!');
    });
  })
}

exports.chainData = chainData;




