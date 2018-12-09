var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var User = require('../app/models/user');

module.exports = function (passport) {

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'

        },
        function (email, password, cb) {
            //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
            var _password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
               console.log(email + "........" +_password);
            return User.findOne({email, _password})
                .then(user => {
                    if (!user) {
                        return cb(null, false, {message: 'Incorrect email or password.'});
                    }
                    return cb(null, user, {message: 'Logged In Successfully'});
                })
                .catch(err => cb(err));
        }
    ));

};