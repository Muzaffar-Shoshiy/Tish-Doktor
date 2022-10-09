const mysql = require("mysql");
require("dotenv").config()
let con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

let tables = async (req, res) => {
    con.connect(async (err) => {
        let sql = `SELECT * FROM dentists WHERE accepted = 0`;
        con.query(sql, async (err, result) => {
            if (err) throw err
            res.render("unacceptedDoctors.ejs", { data: result})
        })
    })
};

let tableAccepted = async (req, res) => {
    con.connect(async (err) => {
        let sql = `SELECT * FROM dentists WHERE accepted = 1`;
        con.query(sql, async (err, result) => {
            if (err) throw err
            res.render("acceptedDoctors.ejs", { result: result})
        })
    })
}

let tablePost = async (req, res) => {
    const chat_id = req.body.chat_id
    con.connect(async (err) => {
        const sql = `UPDATE dentists SET accepted = 1 WHERE chat_id = '${chat_id}'`;
        con.query(sql, async (err, result) => {
            console.log(`${chat_id} is accepted!`)
            res.redirect("/unaccepteddoctors")
        })
    })
}
    
module.exports = {
    tables: tables,
    tablePost: tablePost,
    tableAccepted: tableAccepted,
};