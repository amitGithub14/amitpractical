const express = require('express');
const cors = require('cors');
const app = express();

const whiteList = ['http://locahost:3000', 'http://localhost:3001'];

const corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
