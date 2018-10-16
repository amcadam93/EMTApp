const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user1',
    password: 'Pass123!',
    database: 'test'
});

console.log("Starting...");

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    connection.connect();
    connection.query('SELECT * FROM person', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
    connection.end();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);