/**
 *  POST : for transfer money to another account by phone number
 *       : inc merchant's money
 *       : decrease customer's money
 *       : push data to database
 *  
 *  Created by CPU on 17/6/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/userModel");

router.post("/:businessId", (req, res, next) => {      // ID of person who is scanning the QR code
  const id = req.params.businessId;
  var amount_transfer = req.body.amount_transfer;

  //update customer's data
  User.updateOne({ phone_number: req.body.customer_transfer }, {
    $push: {                                          // push transfer history to database
      history: {
        type_transfer: "pay",
        customer_transfer: req.body.customer_transfer,
        business_transfer: req.body.business_transfer,
        date_time: req.body.date_time,
        amount_transfer: req.body.amount_transfer,
      }
    },
    $inc: {                                           // increase merchant's balance
      balance: -amount_transfer
    },
  }, function (err, docs) {
    console.log(err)
  });

  //update merchant's data
  User.updateOne({ _id: id }, {
    $push: {                                          // push transfer history to database
      history: {
        type_transfer: "income",
        customer_transfer: req.body.customer_transfer,
        business_transfer: req.body.business_transfer,
        date_time: req.body.date_time,
        amount_transfer: req.body.amount_transfer,
      }
    },
    $inc: {                                           // increase merchant's balance
      balance: req.body.amount_transfer
    }
  }, function (err, docs) {
    console.log(err)
  });

  res.status(200).json({ success: true });

});

module.exports = router;