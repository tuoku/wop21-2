'use strict';
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })
const parser = require('body-parser')
const jsonParser = parser.json()
const urlencodedParser = parser.urlencoded({ extended: false })

router.route('/')
  .get(catController.cat_list_get)
  .post(urlencodedParser, upload.single('cat'), catController.cat_create_post)
  .put(jsonParser, catController.cat_update_put);

router.route('/:id')
  .delete(catController.cat_delete)
  .get(catController.cat_get)

module.exports = router;
