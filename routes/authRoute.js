'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const parser = require('body-parser');
const urlencodedParser = parser.urlencoded({extended: false});
const jsonParser = parser.json()

router.post('/login', jsonParser, (req, res) => {
  authController.login(req,res)
});

module.exports = router;