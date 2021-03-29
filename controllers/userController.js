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

const user_create_post = async (req, res) => {
  console.log('post user', req.body);
  const user = req.body;
  const userid = await userModel.addUser(user);
  user.id = userid;
  res.json(user);
};

module.exports = {
  user_list_get,
  user_get,
  user_create_post,
};