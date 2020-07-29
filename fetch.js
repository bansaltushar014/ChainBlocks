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
  })
}

exports.chainData = chainData;




