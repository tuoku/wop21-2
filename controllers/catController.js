'use strict';
// catController
const catModel = require('../models/catModel');
const resize = require('../utils/resize');
const imageMeta = require('../utils/imageMeta')

const cat_get = async (req, res) => {
  const cat = await catModel.getCat(req.params.id)
  res.json(cat);
};

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_create_post = async (req, res) => {
  console.log('post cat', req.body);
  try {
    await resize.makeThumbnail(req.file.path, req.file.filename)
    const coords = await imageMeta.getCoordinates(req.file.path);
    console.log('coords', coords);
    const params = [
      req.body.name,
      req.body.age,
      req.body.weight,
      req.body.owner,
      req.file.filename,
      coords,
    ];
    const picture = req.file.destination + req.file.filename;
    console.log(picture)
    const cat = await catModel.addCat(params);
    await res.json({message: 'upload ok'});
  }
  catch (e) {
    console.log('exif error', e);
    res.status(400).json({message: 'error'});
  }
};

const cat_update_put = async (req, res) => {
  console.log(req.body)
  const cat = req.body;
  const ress = await catModel.updateCat(cat);
  res.send(ress);
};

const cat_delete = async (req, res) => {
  const ress = await catModel.deleteCat(req.params.id);
  res.send(ress);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_create_post,
  cat_update_put,
  cat_delete,
};