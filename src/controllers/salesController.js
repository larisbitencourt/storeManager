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

// const getAll = async (req, res) => {
//   const { data } = await productsService.getAll();
//   return res.status(statusHTTP("SUCCESS")).json({ products: data });
// };

// const getById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { data } = await productsService.getById(id);

//     return res.status(statusHTTP("SUCCESS")).json(data);
//   } catch (error) {
//     return res.status(statusHTTP("INVALID_DATA")).json({
//       err: {
//         code: "invalid_data",
//         message: "Wrong id format",
//       },
//     });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { data } = await productsService.updateProduct(id, req.body);
    

//     return res.status(statusHTTP("SUCCESS")).json(data);
//   } catch (error) {
//     return res.status(statusHTTP("INVALID_DATA")).json({
//       err: {
//         code: "invalid_data",
//         message: error.message,
//       },
//     });
//   }
// };

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

module.exports = { saveSales, };

