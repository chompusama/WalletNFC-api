var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userHistorySchema = new Schema({
    type_transfer:{
        type: String
    },
    customer_transfer: {
        type: String
    },
    business_transfer: {
        type: String
    },
    date_time: {
        type: String
    },
    amount_transfer: {
        type: Number
    },
});

var userSchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    phone_number: {
        type: String
    },
    pin: {
        type: String
    },
    balance: {
        type: Number
    },
    line_id: {
        type: String,
    },
    history: [userHistorySchema],
});

module.exports = mongoose.model('User', userSchema);