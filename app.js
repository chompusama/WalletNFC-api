const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// define path of each routes
const registerRoutes = require("./api/routes/registerRoutes");
const payRoutes = require("./api/routes/payRoutes");
const incomeRoutes = require("./api/routes/incomeRoutes");
const balanceRoutes = require("./api/routes/balanceRoutes");
const historyRoutes = require("./api/routes/historyRoutes");
const verifyRoutes = require("./api/routes/verifyRoutes");
// const uploadRoutes = require("./api/routes/uploadRoutes");

// connect to mongoDB
// username is chompusama and password is digio
mongoose.connect(
  "mongodb+srv://chompusama:digio@wallet-nfc-elwkn.mongodb.net/test?retryWrites=true&w=majority",
  function(err) {
        if(err) throw err;
        console.log('Connect to MongoDB success!')
    }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// makes 'uploads' folder to public
app.use(express.static('uploads'))

// Routes which should handle requests
app.use("/register", registerRoutes);
app.use("/transfer/pay", payRoutes);
app.use("/transfer/income", incomeRoutes);
app.use("/balance", balanceRoutes);
app.use("/history", historyRoutes);
app.use("/verify", verifyRoutes);
// app.use("/upload", uploadRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;