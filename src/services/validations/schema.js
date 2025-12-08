const Joi = require("joi");

const saveProductsSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.min": '"quantity" must be larger than or equal to 1',
  }),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.min": '"quantity" must be larger than or equal to 1',
  }),
});

const saveSalesSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required().messages({
      "number.min": 'Wrong product ID or invalid quantity',
      "number.base": 'Wrong product ID or invalid quantity'

    })
  })
);

module.exports = {
  saveProductsSchema,
  updateProductSchema,
  saveSalesSchema,
};
