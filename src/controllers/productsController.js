const statusHTTP = require("../utils/statusHTTP");
const { productsService } = require("../services");

const saveProducts = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsService.saveProducts({ name, quantity });
    return res.status(statusHTTP("CREATED")).json(product);
  } catch (error) {
    if (error.message === "Product already exists") {
      return res
        .status(statusHTTP("INVALID_DATA")) 
        .json({ err: { message: error.message, code: "invalid_data" } });
    }

    return res
      .status(statusHTTP("INVALID_DATA"))
      .json({
        err: {
          message: error.message || "Dados inválidos",
          code: "invalid_data",
        },
      });
  }
};

module.exports = { saveProducts };
