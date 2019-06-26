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

const User = require("../models/userModel");
const Account = require("../models/accountModel")

var qrPath = 'uploads';
var server = 'https://069e508f.ngrok.io';


router.post("/", (req, res, next) => {
  var line_id = req.body.line_id;
  var phone_number = req.body.phone_number;
  var income_url = server + '/' + phone_number + '-income.png';
  var pay_url = server + '/' + phone_number + '-pay.png';;

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
    url: {
      income_qrcode_url: income_url,
      pay_qrcode_url: pay_url
    }
  });


  //check if account is exists
  Account.find({ phone_number: req.body.phone_number }, function (err, docs) {

    if (docs == "") {
      console.log('new account!');

      //generate QRcode
      //example path 'src/img/qrcode/0619499548-income'
      //example text for gen to qrCode is digio-0619499548-income
      QRCode.toFile(qrPath + '/' + req.body.phone_number + '-income.png', 'digio-' + req.body.phone_number + '-income', {
        color: {
          dark: '#1A1A1A',
          light: '#FFFFFF'    // #0000 is transparent background
        }
      }, function (err) {
        if (err) throw err
        console.log('generate income qrcode is done!')
      })

      QRCode.toFile(qrPath + '/' + req.body.phone_number + '-pay.png', 'digio-' + req.body.phone_number + '-pay', {
        color: {
          dark: '#1A1A1A',
          light: '#FFFFFF'
        }
      }, function (err) {
        if (err) throw err
        console.log('generate pay qrcode is done!')
      })

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