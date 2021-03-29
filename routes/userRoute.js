'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const parser = require('body-parser')
const jsonParser = parser.json()
const urlencodedParser = parser.urlencoded({ extended: false })
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })

router.get('/', userController.user_list_get);

router.get('/:id', function(req, res) {
  userController.user_get(req.params.id,req,res)
});

router.post('/', urlencodedParser, (req, res) => {
  console.log(req.body)
  res.send(req.body)
});

router.put('/', (req, res) => {
  res.send('From this endpoint you can edit users.')
});

router.delete('/cat', (req, res) => {
  res.send('From this endpoint you can delete users.');
});

module.exports = router;
