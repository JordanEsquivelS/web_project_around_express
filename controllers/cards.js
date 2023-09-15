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
  try {
    const card = await Card.findByIdAndRemove(req.params._id);

    if (!card) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' });
    }

    return res.status(200).send({ message: 'Tarjeta eliminada correctamente' });
  } catch (error) {
    return res.status(500).send({ message: 'Error al eliminar la tarjeta' });
  }
};
