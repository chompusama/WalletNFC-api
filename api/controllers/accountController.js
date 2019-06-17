'use strict';

var User = require('../models/userModel');
var Account = require('../models/accountModel')

exports.verify = function (req, res) {
    var _id = new mongoose.Types.ObjectId();
    var name = req.query.name;
    var phone_number = req.query.phone_number;

    if (name == null || phone_number == null) {
        res.json({
            status: 'error',
            message: 'phone number and email are required',
        });
        return null;
    }

    User.findById(phone_number, function (err, docs) {
        if (docs == null) {
            console.log(name);

            //record in userModel
            var newUser = new User({
                _id: _id,
                name: name,
                phone_number: phone_number,
            });
            newUser.save(function (err, docs) {
                console.log('new account created!');
            });

            //record in accountModel
            var saveAccount = new Account({
                _id: _id,
                name: name,
                phone_number: phone_number,
            });

            saveAccount.save(function (err, docs) {
                console.log('record new account!');
            });

            res.json({
                status: 'ok',
                message: 'login successful',
            });
        }
        else {
            res.json({
                status: 'ok',
                message: 'has this account already, login successful',
            });
        }
    });
}