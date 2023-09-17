const mongoose = require('mongoose');
const Card = require('../models/card');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener las tarjetas' });
  }
};

exports.createCard = async (req, res) => {
  const { name, link } = req.body;

  try {
    const card = new Card({
      name,
      link,
      owner: req.user._id,
    });
    await card.save();
    return res.status(201).send(card);
  } catch (error) {
    return res
      .status(400)
      .send({ message: 'Error al crear la tarjeta', error });
  }
};

exports.deleteCard = async (req, res) => {
  const cardId = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(404).send({ message: 'Id de tarjeta no encontrado' });
  }

  try {
    await Card.findByIdAndRemove(cardId).orFail(() => {
      const error = new Error('No se ha encontrado ninguna tarjeta con esa id');
      error.statusCode = 404;
      throw error;
    });

    return res.status(200).send({ message: 'Tarjeta eliminada correctamente' });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || 'Error al eliminar la tarjeta';
    return res.status(status).send({ message });
  }
};
