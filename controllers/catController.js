'use strict';
// catController
const catModel = require('../models/catModel');

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
  const cat = req.body;
  const picture = req.file.destination + req.file.filename;
  console.log(picture)
  console.log(cat)
  cat.filename = picture
  const catid = await catModel.addCat(cat,picture);
  cat.id = catid;
  res.json(cat);
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