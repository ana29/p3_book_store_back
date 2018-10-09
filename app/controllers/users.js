var bcrypt = require('bcrypt');

module.exports = function (app) {
  var User = app.models.user;
  var controller = {};

  controller.saveUser = (req, res) => {

      var user = new User(req.body);
      var _password = req.body.password;
      user.password = user.encryptPassword(_password);

      user.save(function (erro, user) {
      if (erro) {
        res.status(500).json(erro).end();

      } else {
        res.json(user);
        res.status(201);
      }
    });
  };


  controller.getUsers = function (req, res) {
    User.find().exec().then(
      function (user) {
        res.json(user);
        res.status(201);
      },
      function (erro) {
        res.status(500).json(erro);
      }
    );
  };


  controller.getUserById = function (req, res) {
    var _id = req.params.id;
    User.findById(_id).exec()
      .then(
        function (user) {
          if (!user) throw new Error("User not found");
          res.json(user)
        },
        function (erro) {
          res.status(404).json(erro)
        }
      );
  };

  controller.deleteUserById = (req, res) => {
    let _id = req.params.id;
    User.findById(_id).remove().exec()
      .then(
        function () {
          res.end();
        },
        function (erro) {
          return console.error(erro);
        }
      );
  };
  return controller;

};