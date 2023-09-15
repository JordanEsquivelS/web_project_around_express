/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');

const cardController = require(path.join(
  __dirname,
  '..',
  'controllers',
  'cards',
));

const router = express.Router();

router.get('/cards', cardController.getCards);
router.post('/cards', cardController.createCard);
router.delete('/cards/:_id', cardController.deleteCard);

module.exports = router;
