const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const consign = require('consign');
var mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const methodOverride = require('method-override');
var MongoStore = require('connect-mongo')(session);


const PORT = process.env.PORT || 3000;

module.exports = function () {
    require('./passport')(passport);

    var app = express();

    // Passport
    app.use(session({ secret: 'passport', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.set('port', PORT);
    //Static Files
    app.use(express.static('./public'));

    //Cors
    app.use(cors());


    //Body Parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    //Morgan
    app.use(morgan('combined'));

    //Consing
    consign({cwd: 'app'})
        .include('models')
        .then('controllers')
        .then('routes')
        .into(app);


    //Swagger
    swaggerDocument = require('./swagger.json');

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get('/', (req, res) => {
        res.send('42 ')
    });

    // Session Secutiry
    app.use(session({
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 60 * 60 // = 60 minutos de sessão
        }),
        secret: process.env.SESSION_SECRET || 'local-secret',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    return app;
};