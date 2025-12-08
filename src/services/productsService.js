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

module.exports = { saveProducts };
