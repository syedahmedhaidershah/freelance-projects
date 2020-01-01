// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();

const mysql = require('mysql');

const connection = mysql.createConnection({
    // localhost
    host: 'localhost',
    user: 'kingstonantiques_haider',
    password: 'woulzmvu54fz',
    database: 'kingstonantiques_1',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// server configuration
const PORT = 9999;

// create a route for the app
app.get('/', (req, res) => {
    connection.query('SELECT * FROM Authentication', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});


// make the server listen to requests
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});