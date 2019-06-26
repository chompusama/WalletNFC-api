/**
 *  GET : for get current user's balance
 *
 *  Created by CPU on 14/6/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/userModel");

router.get("/:lineId", (req, res, next) => {
  const lineId = req.params.lineId;

  User.findOne({ line_id: lineId }, function (err, docs) {
    console.log(docs);
    if (docs == null || docs == "") {
      res.json({
        status: 'error',
        message: 'line id is invalid',
      });
      return null;
    }
    else {
      var getBalance = docs.balance
      var balanceString = getBalance.toString()
      res.send(balanceString)
    }
  });
});

module.exports = router;
