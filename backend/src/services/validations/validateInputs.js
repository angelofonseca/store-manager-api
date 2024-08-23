const { productSchema } = require('./schemas');

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

module.exports = {
  validateNewProduct,
};