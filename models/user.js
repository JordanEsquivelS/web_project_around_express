const mongoose = require('mongoose');

const urlRegex = /^(http|https):\/\/(www\.)?[^/\s]+\/?[^\s]*[#]?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
