const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, '..', 'data', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
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

router.get('/users/:id', (req, res) => {
  const usersPath = path.join(__dirname, '..', 'data', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    try {
      if (err) {
        throw new Error('Error al leer el archivo');
      }

      const users = JSON.parse(data);
      const user = users.find((u) => u._id === req.params.id);

      if (!user) {
        res.status(404).json({ message: 'ID de usuario no encontrado' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: '¡Algo salió mal!' });
    }
  });
});

module.exports = router;
