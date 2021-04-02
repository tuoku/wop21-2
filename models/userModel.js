'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (id) => {
  try{
    const [row] = await promisePool.query(`SELECT * FROM wop_user WHERE user_id = ${id}`);
    return row;
  }catch (e) {
    console.error('error', e.message);
  }
};

const addUser = async (user) => {
  console.log(user)
  try{
    const [row] = await promisePool.execute('INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.passwd]);
    return row;
  }catch (e) {
    console.error('error', e.message);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
};
