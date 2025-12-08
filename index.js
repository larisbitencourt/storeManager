const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes/routes");

const app = express();

app.use(express.json());
app.use(routes);

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
