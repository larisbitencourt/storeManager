const mongoose = require('mongoose');
const { salesModel, productsModel } = require('../models');

const { saveSalesSchema } = require('./validations/schema');

const saveSales = async (itensSold) => {
  const { error } = saveSalesSchema.validate(itensSold);
  if (error) throw new Error(error.message);

  await Promise.all(
    itensSold.map(async (item) => {
      const productExists = await productsModel.findById(item.productId);

      if (!productExists) {
        throw new Error(`Product ${item.productId} not found`);
      }

      if (productExists.quantity < item.quantity) {
        const err = new Error('Such amount is not permitted to sell');
        err.code = 'stock_problem';
        err.status = 404;
        throw err;
      }

      await productsModel.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity },
      });
    }),
  );

  const sales = await salesModel.create({ itensSold });
  return sales;
};

const getAllSales = async () => {
  const sales = await salesModel.find();
  return { status: 'SUCCESSFUL', data: sales };
};

const getSalesById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale) {
    const error = new Error('Sale not found');
    error.status = 404;
    throw error;
  }
  return { status: 'SUCCESS', data: sale };
};

const updateSale = async (id, itensSold) => {
  const { error } = saveSalesSchema.validate(itensSold);
  if (error) throw new Error(error.message);

  const saleOld = await salesModel.findById(id);
  if (!saleOld) throw new Error('Produto não encontrado');

  await Promise.all(
    saleOld.itensSold.map((item) => productsModel.findByIdAndUpdate(item.productId, {
      $inc: { quantity: item.quantity },
    })),
  );

  await Promise.all(
    itensSold.map(async (item) => {
      const product = await productsModel.findById(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.quantity < item.quantity) throw new Error('Not enough stock');

      await productsModel.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity },
      });
    }),
  );

  const sale = await salesModel.findByIdAndUpdate(
    id,
    { itensSold },
    { new: true },
  );

  if (!sale) {
    throw new Error('Produto não encontrado');
  }

  return { status: 'SUCCESS', data: sale };
};

const deleteSale = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Wrong sale ID format');
  }

  const sale = await salesModel.findById(id);

  if (!sale) {
    const error = new Error('Sale not found');
    error.status = 404;
    throw error;
  }

  await Promise.all(
    (sale.itensSold || []).map((item) => productsModel.updateOne(
      { _id: item.productId },
      { $inc: { quantity: item.quantity } },
    )),
  );

  await salesModel.findByIdAndDelete(id);
};

module.exports = {
  saveSales,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};
