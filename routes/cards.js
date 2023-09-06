const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta al archivo cards.json
const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

// Lista JSON de todas las tarjetas
router.get('/cards', (req, res) => {
  fs.readFile(cardsPath, 'utf8', (err, data) => {
    try {
      if (err) {
        throw new Error('Error al leer el archivo');
      }
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ message: '¡Algo salió mal!' });
    }
  });
});

// Obtiene una tarjeta específica por ID
router.get('/cards/:cardId', (req, res) => {
  const { cardId } = req.params;

  fs.readFile(cardsPath, 'utf8', (err, data) => {
    try {
      if (err) {
        throw new Error('Error al leer el archivo');
      }

      const cards = JSON.parse(data);
      const specificCard = cards.find((card) => card._id === cardId);

      if (!specificCard) {
        return res.status(404).json({ message: 'ID de tarjeta no encontrado' });
      }
      return res.json(specificCard);
    } catch (error) {
      return res.status(500).json({ message: '¡Algo salió mal!' });
    }
  });
});

module.exports = router;
