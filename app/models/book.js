var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var numberValidator = [
    validate({
        validator: function (val) {
            return (val >= 0);
        },
        message: 'The price must be bigger than zero'
    })
];

var schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    print_length: {
        type: String,
        required: false
    },
    isbn: {
        type: Number,
        unique: true,
        required: true
    },
    publisher: {
        type: String,
        required: false
    },
    language: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        validate: numberValidator,
        required: true
    }
    ,
    quantity: {
        type: Number,
        validate: numberValidator,
        required: true
    }
});

module.exports = function () {

    return mongoose.model('Book', schema);

};
