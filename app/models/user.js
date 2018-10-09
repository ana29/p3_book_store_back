var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var bcrypt = require('bcrypt');

var passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [6, 60],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    })
];
var phoneValidator = [
    //(xx) xxxxx-xxxx OR (xx) xxxx-xxxx
    validate({
        validator: 'matches',
        arguments: /^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/
    })
];
var ageValidator = [
    validate({
        validator: function (val) {
            return (val >= 16);
        },
        message: 'The minimum age is 16 years',
    })
];

var schema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        validate: passwordValidator,
        required: true
    },
    age: {
        type: Number,
        validate: ageValidator,
        required: true
    },

    phone: {
        type: String,
        validate: phoneValidator,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: emailValidator,
        unique: true
    }

});

module.exports = function () {

    return mongoose.model('User', schema);

};
