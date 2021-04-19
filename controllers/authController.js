'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require('../models/userModel');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
  // TODO: add passport authenticate
  console.log('posted')
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log(err, user, info)
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({user, token});
    });
  })(req,res)};

const user_create_post = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req); // TODO require validationResult, see userController

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {
    // TODO: bcrypt password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    const params = [
      req.body.name,
      req.body.username,
      hash, // TODO: save hash instead of the actual password
    ];

    if (await userModel.addUser(params)) {
      next();
    } else {
      res.status(400).json({error: 'register error'});
    }
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

  module.exports = {
    login,
    logout,
    user_create_post,
  };