const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database.");
});

// Serve the registration HTML form
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

// Handle form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // SQL Insert Query
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    db.query(sql, [username, email, password], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
