// START OF EXTERNAL CODE
// This code was taken from my DNW course midterm project

// this file implements the database client

const mysql = require('mysql2/promise');
const config = require('../config');

const pool = mysql.createPool(config.db);

// perform a database query and return rows
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

module.exports = {
  query,
};
// END OF EXTERNAL CODE
