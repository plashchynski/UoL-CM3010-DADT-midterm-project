// This file stores a persistent configuration for the whole project
let dotenv = require('dotenv').config()


const config = {
    // Database connection options
    db: {
      host: 'localhost',
      user: dotenv.parsed.MYSQL_USER,
      password: dotenv.parsed.MYSQL_PASSWORD,
      database: 'snpedia_db',
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
    },
  };
  
  module.exports = config;
