/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const cardsRouter = require(path.join(__dirname, 'routes', 'cards.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));

app.use(express.json());

app.use(cardsRouter);

app.use(usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.use((req, res) => {
  res.status(500).send('¡Algo salió mal!');
});

app.listen(PORT, () => {});
