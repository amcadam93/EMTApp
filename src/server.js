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
    connection.query('SELECT * FROM person', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
});

app.get('/', function (req, res) {
    res.send(" Hello from server! ");
});

app.listen(process.env.PORT || 8080);