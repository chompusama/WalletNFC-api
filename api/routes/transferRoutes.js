/**
 *  GET : for get current user's balance
 *
 *  Created by CPU on 14/6/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/userModel");
const Account = require("../models/accountModel")


router.post("/", (req, res, next) => {
  var name = req.body.name;
  var phone_number = req.body.phone_number;

  //check input 
  if (name == null || phone_number == null || name == "" || phone_number == "") {
    res.json({
      status: 'error',
      message: 'please enter phone number and name'
    });
    return null;
  }

  // for accountModel
  var account = new Account({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    phone_number: req.body.phone_number
  });

  // for userModel
  var userData = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    phone_number: req.body.phone_number
  });


  //check exist account
  Account.find({ phone_number: req.body.phone_number }, function (err, docs) {
    
    if (docs == "") {
      console.log('new account!');

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