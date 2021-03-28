'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', function(req, res) {
  userController.user_get(req.params.id,req,res)
});

router.post('/', (req, res) => {
  res.send('From this endpoint you can add users.')
});

router.put('/', (req, res) => {
  res.send('From this endpoint you can edit users.')
});

router.delete('/cat', (req, res) => {
  res.send('From this endpoint you can delete users.')
});

module.exports = router;
