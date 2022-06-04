const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "calendarcrud",
});

app.post("/", (req, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const { label } = req.body;
    const { day } = req.body;
    const { id } = req.body;
    let mysql =
        "INSERT INTO savedevent ( title, description, label, day, id ) VALUES (?, ?, ?, ?, ?)";
    db.query(mysql, [title, description, label, day, id], (err, result) => {
        res.send(result);
    });
});

app.post("/123", (req, res) => {
    const { casa } = req.body;
    let mysql = "INSERT INTO test ( casa ) VALUES (?)";
    db.query(mysql, [casa], (err, result) => {
        res.send(result);
    });
});

app.listen(3001, () => {
    console.log("rodando na porta 3001");
});
