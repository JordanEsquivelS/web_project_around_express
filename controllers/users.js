/* eslint-disable import/no-dynamic-require */
const path = require('path');

const User = require(path.join(__dirname, '..', 'models', 'user'));

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res
      .status(500)
      .send({ message: 'No se pudo obtener la lista de usuarios' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ message: 'ID de usuario no encontrado' });
    }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: 'Error al obtener el usuario' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ message: 'Error al crear el usuario' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
