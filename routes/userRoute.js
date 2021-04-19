'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const parser = require('body-parser');
const urlencodedParser = parser.urlencoded({extended: false});
const {body, validationResult} = require('express-validator');

const checkErrors = (req, res) => {
  let errors = validationResult(req);
  console.log(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
};

router.route('/')
    .get(userController.user_list_get)

router.route('/:id')
  .get(userController.user_get);




module.exports = router;
