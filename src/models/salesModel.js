const mongoose = require('./connection');

const salesSchema = new mongoose.Schema({
  itensSold: [
    {
      productId: String,
      quantity: Number,
    },
  ],
}, { versionKey: false });

module.exports = mongoose.model('sales', salesSchema);
