const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 3000;
const IP_ADDRESS = '172.17.15.58';
// Database connection
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'password',
database: 'cafenodejs'
});

connection.connect();

// Middleware to check for token in headers
const authenticateToken = (req, res, next) => {
const token = req.headers['authorization'];
if (!token || token !== 'Bearer my_secret_token') {
return res.sendStatus(401);
}
next();
};

// Protected route with database query
app.get('/api/data', authenticateToken, (req, res) => {
connection.query('SELECT * FROM user', (error, results, fields) => {
if (error) throw error;
res.json({ data: results });
});
});

// Start the server
app.listen(PORT, IP_ADDRESS ,() => {
    // console.log(`Server running at ${IP_ADDRESS}:${PORT}`);
});