var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
module.exports = function (uri) {
  mongoose.connect(uri, { useNewUrlParser: true, poolSize: 15 });

  mongoose.connection.on('connected', function () {
    console.log('Mongoose! connected in ' + uri);
  });
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose! disconnected in ' + uri);
  });
  mongoose.connection.on('error', function (erro) {
    console.log('Mongoose! Erro on connection: ' + erro);
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose! Disconnected by application termination');

      process.exit(0);
    });
  });

};