'use strict';
const userModel = require('../models/userModel');

const user_get = async (req, res) => {
  const user = await userModel.getUser(req.params.id)
  res.json(user);
};

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};



module.exports = {
  user_list_get,
  user_get,
};