/**
 * Este arquivo foi criado pela Trybe.
 * Modificado em 7 de Setembro de 2024.
 */

const express = require('express');
const { productsRoute, salesRoute } = require('./routes/index');

const app = express();

app.use(express.json());
app.use(productsRoute);
app.use(salesRoute);

app.get('/', (req, res) => {
  res.json({ status: 'Store Manager UP!' });
});

module.exports = app;