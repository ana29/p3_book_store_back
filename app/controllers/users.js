var bcrypt = require('bcrypt');

module.exports = function (app) {
  var User = app.models.user;
  var controller = {};

  controller.saveUser = (req, res) => {
    console.log('API: saveUser');
    var user = new User(req.body);

    user.save(function (erro, user) {
      if (erro) {
        res.status(500).json(erro).end();
        console.log(erro);
      } else {
        res.json(user);
        res.status(201);
        console.log(201);
      }
    });
  };


  controller.getUsers = function (req, res) {
    console.log('API: getUsers');
    User.find().exec().then(
      function (user) {
        res.json(user);
        res.status(201);
        console.log(201);
      },
      function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };


  controller.getUserById = function (req, res) {
    console.log('API: getUserById');
    var _id = req.params.id;
    User.findById(_id).exec()
      .then(
        function (user) {
          if (!user) throw new Error("User not found");
          res.json(user)
        },
        function (erro) {
          console.log(erro);
          res.status(404).json(erro)
        }
      );
  };

  controller.deleteUserById = (req, res) => {
    console.log('API: deleteUserById');
    let _id = req.params.id;
    Usuario.remove(_id).exec()
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

}
