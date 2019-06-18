/**
 *  GET : for get current user's history
 *
 *  Created by CPU on 18/6/19
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/userModel");

router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;

    User.findById(id)
      .exec()
      .then(doc => {
        console.log("Get history process", doc);
        if (doc) {
          res.status(200).json({
              history: doc.history
            });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

module.exports = router;
