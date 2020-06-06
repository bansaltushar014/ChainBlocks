const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

let chainBookSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  bookId: { type: String, required: true, max: 100 },
  price: { type: String, required: true, max: 100 },
  By: { type: String, required: true, max: 100 },
  image: { type: String, required: true, max: 100 },
})

const chainData = mongoose.model('chainBook1', chainBookSchema);

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




