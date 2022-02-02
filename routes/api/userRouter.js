const express = require('express');
const userRouter = express.Router();
const Users = require('../../models/users.js');
var cors = require('./cors');
userRouter
  .route('/')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Users.find({})
      .populate('images.user')
      .then(
        (users) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(users);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    Users.create(req.body)
      .then(
        (user) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(user);
        },
        (err) => next(err)
      )
      .catch((error) => next(error));
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT method not supported for /api/users');
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE method not supported for /api/users');
  });

userRouter
  .route('/:id')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Users.findById(req.params.id)
      .populate('images.user')
      .then(
        (users) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(users);
        },
        (error) => next(error)
      )
      .catch((error) => next(error));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT method not supported for /users/:id');
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    Users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(
        (user) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(user);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    Users.findByIdAndRemove(req.params.id)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

userRouter
  .route('/:id/upload')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('Get method not supported for /users/upload');
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    Users.findById(req.params.id)
      .then(
        (user) => {
          if (user != null) {
            req.body.user = req.params.id;
            user.images.push(req.body);
            user.save().then(
              (user) => {
                Users.findById(user._id).then((user) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(user);
                });
              },
              (err) => next(err)
            );
          } else {
            error = new Error('User ' + req.params.id + ' not found.');
            error.status = 404;
            return next(error);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT method not supported for /users/upload');
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('Delete method not supported for /users/upload');
  });

module.exports = userRouter;
