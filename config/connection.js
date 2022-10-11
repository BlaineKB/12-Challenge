// Connects the client
require('dotenv').config();
const mysql = require('mysql2');
const db_user = process.env.DB_USERNAME;
const db_pass = process.env.DB_PASSWORD;

// Connects to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: db_user,
    password: db_pass,
    database: 'employeetracker_db'
  }
)

module.exports = connection;