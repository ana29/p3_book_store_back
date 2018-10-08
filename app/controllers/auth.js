const HttpStatusCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    var passport = require('passport');
    var controller = {};

    controller.login =  function (req, res, next) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                // generate a signed son web token with the contents of user object and return it in the response
                const token = jwt.sign(user, 'your_jwt_secret');
                return res.json({user, token});
            });
        })(req, res);
    };

    // controller.login = function (req, res, next) {
    //
    //     passport.authenticate('local', function (err, user, info) {
    //         if (err) {
    //             return next(err);
    //         }
    //
    //         if (!user) {
    //             return res.status(HttpStatusCodes.UNAUTHORIZED).json({err: info});
    //         }
    //
    //         req.logIn(user, function (err) {
    //             if (err) {
    //                 return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    //                     err: err,
    //                     msg: 'Could not log in user'
    //                 });
    //             }
    //
    //             res.status(HttpStatusCodes.OK).json({msg: 'Login successful!'});
    //
    //         });
    //     })(req, res, next);
    // };

    controller.logout = function (req, res) {
        req.logout();
        res.status(HttpStatusCodes.OK).send('Logged out!')
    };

    controller.status = function (req, res) {
        var user = req.user;
        if (user) {
            user = _.omit(user.toJSON(), 'password');
            res.status(HttpStatusCodes.OK).send({user: user, status: true});
        } else {
            res.status(HttpStatusCodes.OK).send({status: false});
        }
    };


    return controller;

};