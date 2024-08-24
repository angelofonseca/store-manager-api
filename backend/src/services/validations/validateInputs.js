const { productSchema, salesSchema } = require('./schemas');

const validateNewProduct = (name) => {
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

const validateNewSales = async (sale) => {
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

module.exports = {
  validateNewProduct,
  validateNewSales,
};