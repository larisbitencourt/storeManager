const mongoose = require('./connection');

const salesSchema = new mongoose.Schema({
  itensSold: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
}, { versionKey: false });

module.exports = mongoose.model('sales', salesSchema);
