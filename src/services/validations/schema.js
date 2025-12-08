const Joi = require("joi");

const saveProductsSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.min': '"quantity" must be larger than or equal to 1',
    
  }),
});

module.exports = {
  saveProductsSchema,
};
