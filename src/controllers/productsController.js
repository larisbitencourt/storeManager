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

    return res.status(statusHTTP("INVALID_DATA")).json({
      err: {
        message: error.message || "Dados inválidos",
        code: "invalid_data",
      },
    });
  }
};

const getAll = async (req, res) => {
  const { data } = await productsService.getAll();
  return res.status(statusHTTP("SUCCESS")).json({ products: data });
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await productsService.getById(id);

    return res.status(statusHTTP("SUCCESS")).json(data);
  } catch (error) {
    return res.status(statusHTTP("INVALID_DATA")).json({
      err: {
        code: "invalid_data",
        message: "Wrong id format",
      },
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await productsService.updateProduct(id, req.body);
    

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

const deleteProduct = async (req, res) => {
    try {
    const { id } = req.params;
    const { message } = await productsService.deleteProduct(id);
    

    return res.status(statusHTTP("SUCCESS")).json(message);
  } catch (error) {
    return res.status(statusHTTP("INVALID_DATA")).json({
      err: {
        code: "invalid_data",
        message: error.message,
      },
    });
  }

};

module.exports = { saveProducts, getAll, getById, updateProduct, deleteProduct };
