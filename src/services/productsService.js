const { productsModel } = require("../models");
const mongoose = require('mongoose');

const {
  saveProductsSchema,
  updateProductSchema,
} = require("./validations/schema");

const saveProducts = async ({ name, quantity }) => {
  const { error } = saveProductsSchema.validate({ name, quantity });
  if (error) throw new Error(error.message);

  const existingProduct = await productsModel.findOne({ name });
  if (existingProduct) throw new Error("Product already exists");

  const product = await productsModel.create({ name, quantity });
  console.log(product);
  return product;
};

const getAll = async () => {
  const products = await productsModel.find();
  return { status: "SUCCESSFUL", data: products };
};

const getById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    return { status: "INVALID_DATA", data: { message: "Product not exists" } };
  }
  return { status: "SUCCESSFUL", data: product };
};

const updateProduct = async (id, { name, quantity }) => {
  const { error } = updateProductSchema.validate({ name, quantity });
  if (error) throw new Error(error.message);

  const product = await productsModel.findByIdAndUpdate(
    id,
    { name, quantity },
    { new: true }
  );

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  return { status: "SUCCESS", data: product };
};

const deleteProduct = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Wrong id format");
  }
  const product = await productsModel.findByIdAndDelete(id);

  if (!product) {
    throw new Error("Product not exists");
  }

  return { status: "SUCCESS", message: "Product deleted" };
};

module.exports = {
  saveProducts,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
