/**
 * Este arquivo foi criado pela Trybe.
 * Modificado em 7 de Setembro de 2024.
 */

const app = require('./app');

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});
