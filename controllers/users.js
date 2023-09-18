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

const updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'about'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ message: 'Actualizaciones no válidas!' });
  }

  try {
    const user = await User.findById(req.user._id).orFail(new Error('Usuario no encontrado'));

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();
    return res.send(user);
  } catch (err) {
    if (err.message === 'Usuario no encontrado') {
      return res.status(404).send({ message: err.message });
    }
    return res.status(400).send({ message: 'Error al actualizar el usuario' });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    if (!req.body.avatar) {
      return res
        .status(400)
        .send({ message: 'El campo avatar es requerido para esta operación.' });
    }

    const user = await User.findById(req.user._id).orFail(new Error('Usuario no encontrado'));

    user.avatar = req.body.avatar;
    await user.save();

    return res.send(user);
  } catch (err) {
    if (err.message === 'Usuario no encontrado') {
      return res.status(404).send({ message: err.message });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(400).send({ message: 'Error al actualizar el avatar' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
