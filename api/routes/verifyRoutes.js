/**
 *  GET : check if account is exists by line id
 * 
 *  Created by CPU on 24/6/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/userModel");
const Account = require("../models/accountModel")

router.get("/:lineId", (req, res, next) => {
    const lineId = req.params.lineId;

    Account.find({ line_id: lineId }, function (err, docs) {

        if (docs == "") {
            console.log('can create new account!');
            res.status(200).send('true');
        }
        else {
            res.status(200).send('false');
        }

    });

});

module.exports = router;