// Connects the client
require('dotenv').config();
const mysql = require('mysql2');
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

// Connects to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: db_user,
    password: db_pass,
    database: 'employeetracker_db'
  }
);

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connection Successful!');
});

module.exports = connection;