const express = require('express');

const app = express();
const PORT = 3000;
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

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
