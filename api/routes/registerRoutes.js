/**
 *  POST : for save new account to mongoDB 
 *       : generate QRcode to png and then storage in uploads folder
 *       : save url image to database
 * 
 *  Created by CPU on 13/6/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const QRCode = require("qrcode");
const mergeImg = require("merge-img");

const User = require("../models/userModel");
const Account = require("../models/accountModel")

router.post("/", (req, res, next) => {
    var line_id = req.body.line_id;
    var phone_number = req.body.phone_number;
    var income_url = /*server +*/ '/' + phone_number + '-income.jpg';
    var pay_url = /*server + */'/' + phone_number + '-pay.jpg';

    //check input 
    if (phone_number == null || phone_number == "") {
        res.json({
            status: 'error',
            message: 'please enter phone number and name'
        });
        return null;
    }

    // for accountModel
    var account = new Account({
        _id: new mongoose.Types.ObjectId(),
        line_id: req.body.line_id,
        phone_number: req.body.phone_number,
    });

    // for userModel
    var userData = new User({
        _id: new mongoose.Types.ObjectId(),
        line_id: req.body.line_id,
        phone_number: req.body.phone_number,
        balance: 1000, //initialize money (for testing)
        income_qrcode_url: income_url,
        pay_qrcode_url: pay_url

    });


    //check if account is exists
    Account.find({ phone_number: req.body.phone_number }, function (err, docs) {

        if (docs == "") {
            console.log('new account!');

            //generate QRcode
            //example path 'src/img/qrcode/0619499548-income'
            //example text for gen to qrCode is digio-0619499548-income
            var qrOriginPath = 'src/img';
            var qrIncomePath = qrOriginPath + '/' + req.body.phone_number + '-income.png';
            var qrPayPath = qrOriginPath + '/' + req.body.phone_number + '-pay.png';
            var qrIncomeText = 'digio-' + req.body.phone_number + '-income';
            var qrPayText = 'digio-' + req.body.phone_number + '-pay';
            var qrIncomeLogo = 'uploads/' + req.body.phone_number + '-income.jpg';
            var qrPayLogo = 'uploads/' + req.body.phone_number + '-pay.jpg';
            var logoPath = 'src/digio_logo_new.png';

            QRCode.toFile(qrIncomePath, qrIncomeText, {
                color: {
                    dark: '#1A1A1A',
                    light: '#FFFFFF'    // #0000 is transparent background
                },
                width: 1000,
                margin: 2
            }, function (err) {
                if (err) throw err
                console.log('generate income qrcode is done!')
            })

            QRCode.toFile(qrPayPath, qrPayText, {
                color: {
                    dark: '#1A1A1A',
                    light: '#FFFFFF'
                },
                width: 1000,
                margin: 2
            }, function (err) {
                if (err) throw err
                console.log('generate pay qrcode is done!')
            })

            mergeImg([qrIncomePath, logoPath],
                {
                    direction: false,
                    align: 'center',
                    offset: -1000
                })
                .then((img) => {
                    img.write(qrIncomeLogo, () => console.log('done'));
                });

            mergeImg([qrPayPath, logoPath],
                {
                    direction: false,
                    align: 'center',
                    offset: -1000
                })
                .then((img) => {
                    img.write(qrPayLogo, () => console.log('done'));
                });

            //save in accountModel
            account.save().then(result => {
                console.log(result);
                res.status(201).json({
                    message: "new account success!",
                    createdAccount: result
                });
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });

            //save in userModel
            userData.save().then(result => {
                console.log(result);
                res.status(201).json({
                    message: "new account success!",
                    createdUser: result
                });
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });

        }
        else {
            res.json({
                status: 'ok',
                message: 'has this account already, login successful',
            });
        }

    });

});

module.exports = router;