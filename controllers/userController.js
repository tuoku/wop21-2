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

module.exports = {
  user_list_get,
  user_get,
};