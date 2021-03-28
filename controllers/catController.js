'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
  res.json(cats);
};

function cat_get(id,req,res) {
  res.json(cats.filter((cat) => {
    return cat.id === id
  }))
}

module.exports = {
  cat_list_get,
  cat_get,
};