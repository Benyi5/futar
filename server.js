const express = require('express');
const app = express();
const { __dirname } = require("path");
const cors = require('cors');
const { text } = require("body-parser");
app.use(cors({origin: 'http://localhost:3000'}));
const path = require('path');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false }))
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "",
    database: "pizza"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("Kapcsolódva az adatbázishoz.");
});

app.get("/pizza", (req, res) => {
    let sql = "SELECT * FROM futar;";
    connection.query(sql, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send("Adatbázis hiba történt.");
            return;
        }
        res.send(rows);
    }); 
});

app.post("/pizza", (req, res) => {
    let uj = req.body;
    let sql = "INSERT INTO pizza (fazon, fnev, ftel) VALUES (NULL,?,?)";
    let sqlParams = [uj.fnev, uj.ftel];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send("Adatbázis hiba történt.");
            retur
        }
        let lastInsertId = rows.insertId;
        res.status(201).send(lastInsertId, rows.fnev, rows.ftel);
    });
});

app.put("/pizza/:id", (req, res) => {
    let id = req.params.id;
    let uj = req.body;
    let sql = "UPDATE futar SET fnev = ?, tel = ? WHERE fazon = ?";
    let sqlParams = [uj.fnev, uj.tel, id];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send("Adatbázis hiba történt.");
            return;
        }
        res.status(201).send(rows);
    });
});




app.listen(3000, () => {
    console.log('Listening to 3000');
});