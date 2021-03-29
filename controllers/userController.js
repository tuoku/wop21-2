'use strict';
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
  let userss = users
  userss.forEach(u =>{ delete u.password
  })
  res.json(userss);
};

function user_get(id,req,res) {
  res.json(users.filter((user) => {
    delete user.password
    return user.id === id
  }))
}

const user_post_new_user = async (req, res) => {
  console.log('post user', req.body);
  const user = req.body;
  const userid = await userModel.insertUser(user);
  user.id = userid;
  res.json(user);
};

module.exports = {
  user_list_get,
  user_get,
};