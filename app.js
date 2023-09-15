/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

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

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');

  app.listen(PORT, () => {});
});
