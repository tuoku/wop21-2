'use strict';
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer  = require('multer')
const parser = require('body-parser')
const jsonParser = parser.json()
const {body, validationResult} = require('express-validator');
let validFile = false

const fileFilter = (req, file, cb) =>{
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/gif" || file.mimetype === "image/jpeg"){
    cb(null, true)
    validFile = true
  } else {
    cb(null, false);
    validFile = false
    return cb(new Error('invalid file'))
  }
}

const filename = (req,file,cb) => {
  cb(null, Date.now() + file.mimetype.split('/')[1])
}

const upload = multer({ dest: './uploads/', fileFilter: (req,file,cb) => {
  fileFilter(req,file,cb)
  }
  })

router.route('/')
  .get(catController.cat_list_get)
  .post(upload.single('cat'),
    body('name').isLength({min: 1}).escape().blacklist(';'),
    body('age').isInt({min: 0}),
    body('weight').isFloat({min: 0.1}),
    body('owner').isInt({min: 0}),
    async (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      } else if(validFile) {
        let a = await catController.cat_create_post(req,res)
        res.send(a)
      } else return res.status(400).json({error: 'invalid file'})
  })
  .put(jsonParser,
    body('name').isLength({min: 1}).escape().blacklist(';'),
    body('age').isInt({min: 0}),
    body('weight').isFloat({min: 0.1}),
    body('owner').isInt({min: 0}),
    async (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      } else {
        let a = await catController.cat_update_put(req,res)
        res.send(a)
      }
    });

router.route('/:id')
  .delete(catController.cat_delete)
  .get(catController.cat_get)

module.exports = router;
