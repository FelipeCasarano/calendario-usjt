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

app.post("/save", (req, res) => {
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

app.get("/getEvents", (req, res) => {
    db.query("SELECT * FROM savedevent", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put("/edit", (req, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const { label } = req.body;
    const { id } = req.body;
    let mysql =
        "UPDATE savedevent SET title = ?, description = ?, label = ?  WHERE id = ?";
    db.query(mysql, [title, description, label, id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let mysql = "DELETE FROM savedevent WHERE id = ?";
    db.query(mysql, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.listen(3001, () => {
    console.log("rodando na porta 3001");
});
