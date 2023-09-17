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
    const user = await User.findById(req.params.userId).orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = 404;
      throw error;
    });

    return res.status(200).send(user);
  } catch (err) {
    const status = err.statusCode || 500;
    const message = err.message || 'Error al obtener el usuario';
    return res.status(status).send({ message });
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
