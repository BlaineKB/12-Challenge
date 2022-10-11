const mysql = require('mysql2');

// Connects to database using your mysql username and password
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Piper',
  database: 'employeetracker_db'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connection Successful!');
});

module.exports = connection;