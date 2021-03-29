'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const parser = require('body-parser')
const jsonParser = parser.json()
const urlencodedParser = parser.urlencoded({ extended: false })
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })

router.route('/')
  .get(userController.user_list_get)
  .post(urlencodedParser, userController.user_create_post);


router.route('/:id')
  .get(userController.user_get);



module.exports = router;
