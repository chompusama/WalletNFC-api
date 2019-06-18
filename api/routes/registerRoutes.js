/**
 *  POST : for save new account to mongoDB 
 * 
 *  Created by CPU on 13/6/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/userModel");
const Account = require("../models/accountModel")


router.post("/", (req, res, next) => {
  var line_id = req.body.line_id;
  var phone_number = req.body.phone_number;

  //check input 
  if (line_id == null || phone_number == null || line_id == "" || phone_number == "") {
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
  });


  //check if account is exists
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