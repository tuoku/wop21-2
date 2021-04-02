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
    .post(urlencodedParser,
    body('name').isLength({min: 3}).trim().escape(),
    body('email').isEmail().trim().escape(),
    body('passwd').isStrongPassword({minLength: 8, minUppercase: 1, minLowercase: 0, minNumbers: 0, minSymbols: 0,returnScore: false}).trim().escape(),
    async (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      } else {
        let a = await userController.user_create_post(req,res)
        res.send(a)
      }
    });

router.route('/:id').get(userController.user_get);

module.exports = router;
