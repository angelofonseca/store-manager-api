const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleSchema = Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '"productId" is required',
    'number.base': '"productId" must be a number',
  }),
  quantity: Joi.number().greater(0).required().messages({
    'any.required': '"quantity" is required',
    'number.greater': '"quantity" must be greater than or equal to 1',
  }),
});

const salesSchema = Joi.array().items(saleSchema);

module.exports = { 
  productSchema,
  salesSchema,
};