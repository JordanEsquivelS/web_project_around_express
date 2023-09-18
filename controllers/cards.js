/* eslint-disable import/no-dynamic-require */
const mongoose = require('mongoose');
const path = require('path');

const Card = require(path.join(__dirname, '..', 'models', 'card'));

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

exports.likeCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params._id,
      { $addToSet: { likes: req.user._id } },
      { new: true },

    ).orFail(new Error('Tarjeta no encontrada'));

    return res.status(200).send(updatedCard);
  } catch (error) {
    if (error.message === 'Tarjeta no encontrada') {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: 'Error al dar like a la tarjeta' });
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params._id,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('Tarjeta no encontrada'));

    return res.status(200).send(updatedCard);
  } catch (error) {
    if (error.message === 'Tarjeta no encontrada') {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: 'Error al dar dislike a la tarjeta' });
  }
};
