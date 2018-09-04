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
  return controller;

}
