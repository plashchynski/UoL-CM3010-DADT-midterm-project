// This file stores a persistent configuration for the whole project

const config = {
    // Database connection options
    db: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'snpedia_db',
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
    },
  };
  
  module.exports = config;
