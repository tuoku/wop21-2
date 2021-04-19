'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (id) => {
  try{
    const [row] = await promisePool.query(`SELECT * FROM wop_cat WHERE cat_id = ${id}`);
    return row;
  }catch (e) {
    console.error('error', e.message);
  }
};

const addCat = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);',
        params);
    return rows;
  }
  catch (e) {
    console.log('error', e.message);
  }
}

const updateCat = async (cat) => {
  console.log(cat)
  let params = [cat.name, cat.age, cat.weight, cat.id]
  console.log(params)
  const [row] = await promisePool.execute('UPDATE wop_cat SET name=?, age=?, weight=? WHERE cat_id=?', params);
  return true;
};

const deleteCat = async (id) => {
  const [row] = await promisePool.execute('DELETE FROM wop_cat WHERE cat_id=?', [id]);
  return true;
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  deleteCat,
  updateCat,
};
