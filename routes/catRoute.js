'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })


router.get('/', catController.cat_list_get);

router.get('/:id', function(req, res) {
  catController.cat_get(req.params.id,req,res)
});

router.post('/', upload.single('file'),(req, res) => {
  console.log(req.file, req.body)
  res.send(req.file)
});

router.put('/', (req, res) => {
  res.send('From this endpoint you can edit cats.')
});

router.delete('/cat', (req, res) => {
  res.send('From this endpoint you can delete cats.')
});

module.exports = router;
