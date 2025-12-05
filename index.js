const express = require("express");
const mongoose = require("mongoose");

const app = express();

const MONGO_DB_URL = "mongodb://localhost:27017/StoreManager";
const DB_NAME = "StoreManager";

mongoose.connect(MONGO_DB_URL, {
  dbName: DB_NAME,
});

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
