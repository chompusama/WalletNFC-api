/**
 *  GET : for get current user's balance
 *
 *  Created by CPU on 14/6/19
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
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              balance: doc.balance
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





 / old version */
 // router.get("/:_id", (req, res, next) => {
//     // var _id = req.params._id;
//     // console.log("uid is " + _id);

//     // if (_id == null || _id == '') {
//     //     res.json({
//     //         status: 'error',
//     //         message: '_id is required',
//     //     });
//     //     return null;
//     // }
//     var uid = req.params._id
//     console.log(uid + ' first');

//     User.find({_id: req.params._id}, function(err, doc) {
//         console.log(uid + ' second');
//         res.json({
//             balance: doc
//         });
//     });

// });