const mongoose = require('mongoose');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

mongoose.connect(MONGO_DB_URL);

module.exports = mongoose;
