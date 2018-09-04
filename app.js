const express = require('express')
var http = require('http');
var morgan = require('morgan')
const app = express()

require('./config/database.js')('mongodb://localhost:27017/p3');

http.createServer(app).listen(3000, function () {
  console.log("Servidor escutando na porta " + '3000');
});
