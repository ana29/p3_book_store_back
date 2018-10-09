var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    cart: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
});

module.exports = function () {

    return mongoose.model('Order', schema);

};
