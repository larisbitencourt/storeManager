const statusHTTP = require("../utils/statusHTTP");
const { salesService } = require("../services");

const saveSales = async (req, res) => {
  try {
    const itensSold  = req.body;
    const sales = await salesService.saveSales(itensSold);
    return res.status(statusHTTP("SUCCESS")).json(sales);
  } catch (error) {
    return res.status(statusHTTP("INVALID_DATA")).json({
      err: {
        code: "invalid_data",
        message: error.message,
      },
    });
  }
};

const getAllSales = async (req, res) => {
  const { data } = await salesService.getAllSales();
  return res.status(statusHTTP("SUCCESS")).json({ sales: data });
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await salesService.getSalesById(id);

    return res.status(statusHTTP("SUCCESS")).json(data);
  } catch (error) {
    return res.status(statusHTTP("NOT_FOUND")).json({
      err: {
        code: "not_found",
        message: "Sale not found",
      },
    });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await salesService.updateSale(id, req.body);
    
    return res.status(statusHTTP("SUCCESS")).json(data);
  } catch (error) {
    return res.status(statusHTTP("INVALID_DATA")).json({
      err: {
        code: "invalid_data",
        message: error.message,
      },
    });
  }
};

// const deleteProduct = async (req, res) => {
//     try {
//     const { id } = req.params;
//     const { message } = await productsService.deleteProduct(id);
    

//     return res.status(statusHTTP("SUCCESS")).json(message);
//   } catch (error) {
//     return res.status(statusHTTP("INVALID_DATA")).json({
//       err: {
//         code: "invalid_data",
//         message: error.message,
//       },
//     });
//   }

// };

module.exports = { 
    saveSales, 
    getAllSales,
    getSalesById,
    updateSale,
};

