var mongoose = require('mongoose');
var validate = require('mongoose-validator')

module.exports = function () {
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
        }
    });
    return mongoose.model('Book', schema);

};
