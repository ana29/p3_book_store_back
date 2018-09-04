var http = require('http');
var morgan = require('morgan')
var app = require('./config/express')();

require('./config/database.js')('mongodb://localhost:27017/p3');

http.createServer(app).listen(app.get('port'), function () {
  console.log('Server listening on port ' +
    app.get('port'));
});
