const { salesModel, productsModel } = require("../models");

const {
  saveSalesSchema,
} = require("./validations/schema");

const saveSales = async (itensSold) => {
  const { error } = saveSalesSchema.validate(itensSold);
  if (error) throw new Error(error.message);

  for (const item of itensSold) {
  const productExists = await productsModel.findById(item.productId);
  if (!productExists) {
    throw new Error(`Product ${item.productId} not found`);
  }
}


  const sales = await salesModel.create({itensSold});
  return sales;
};

// const getAll = async () => {
//   const products = await productsModel.find();
//   return { status: "SUCCESSFUL", data: products };
// };

// const getById = async (id) => {
//   const product = await productsModel.findById(id);
//   if (!product) {
//     return { status: "INVALID_DATA", data: { message: "Product not exists" } };
//   }
//   return { status: "SUCCESSFUL", data: product };
// };

// const updateProduct = async (id, { name, quantity }) => {
//   const { error } = updateProductSchema.validate({ name, quantity });
//   if (error) throw new Error(error.message);

//   const product = await productsModel.findByIdAndUpdate(
//     id,
//     { name, quantity },
//     { new: true }
//   );

//   if (!product) {
//     throw new Error("Produto não encontrado");
//   }

//   return { status: "SUCCESS", data: product };
// };

// const deleteProduct = async (id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new Error("Wrong id format");
//   }
//   const product = await productsModel.findByIdAndDelete(id);

//   if (!product) {
//     throw new Error("Product not exists");
//   }

//   return { status: "SUCCESS", message: "Product deleted" };
// };

module.exports = {
  saveSales,

};
