const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admindatabase18', // Ensure this matches the password you set
  database: 'todo_db' // Ensure this matches the database you created
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

module.exports = connection;