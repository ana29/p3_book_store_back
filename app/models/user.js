var mongoose = require('mongoose');

module.exports = function () {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    contact: {
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      }
    }
  });

  return mongoose.model('User', schema);

};
