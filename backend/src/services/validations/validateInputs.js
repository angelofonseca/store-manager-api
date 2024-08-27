const { productSchema, salesSchema, quantitySchema } = require('./schemas');

const validateProductName = (name) => {
  const { error } = productSchema.validate({ name });

  if (error) {
    const minLenghtMessage = 'length must be at least 5 characters long';

    // Verifica se a mensagem do joi é referente a de validação do tamanho do nome
    if (error.message.includes(minLenghtMessage)) {
      return { status: 'INVALID_VALUE', message: error.message }; 
    }

    // Caso não seja passado o parametro correto (name), retorna este erro
    return { status: 'BAD_REQUEST', message: error.message };
  }
};

const validateSale = (sale) => {
  const { error } = salesSchema.validate(sale);

  if (error) {
    if (error.message.includes('is required')) {
      return { status: 'BAD_REQUEST', message: error.message };
    }
  
    if (error.message.includes('Product not found')) {
      return { status: 'NOT_FOUND', message: error.message };
    }
    
    return { status: 'INVALID_VALUE', message: error.message };
  }
};

const validateQuantity = (quantity) => {
  const { error } = quantitySchema.validate(quantity);

  if (error) {
    if (error.message.includes('is required')) {
      return { status: 'BAD_REQUEST', message: error.message };
    }
    
    return { status: 'INVALID_VALUE', message: error.message }; 
  }
};

module.exports = {
  validateProductName,
  validateSale,
  validateQuantity,
};