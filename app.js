/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const cardsRouter = require(path.join(__dirname, 'routes', 'cards.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6504b8c73db08aa6954905b4',
  };
  next();
});

app.use(cardsRouter);

app.use(usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.use((req, res) => {
  res.status(500).send('¡Algo salió mal!');
});

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  app.listen(PORT, () => {});
});
