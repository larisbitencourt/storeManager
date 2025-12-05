const mongoose = require('./connection');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
}, { versionKey: false });

module.exports = mongoose.model('products', productSchema);
