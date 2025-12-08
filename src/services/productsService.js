const { productsModel } = require('../models');
const { saveProductsSchema } = require('./validations/schema');

const saveProducts = async ({ name, quantity }) => {

  const { error } = saveProductsSchema.validate({ name, quantity });
  if (error) throw new Error(error.message);

  const existingProduct = await productsModel.findOne({ name });
  if (existingProduct) throw new Error('Product already exists');

  const product = await productsModel.create({ name, quantity });
   console.log(product)
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

module.exports = { saveProducts, getAll, getById };
