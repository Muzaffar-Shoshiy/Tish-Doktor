const mysql = require("mysql");
require("dotenv").config()
let con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

let rejected = async (req, res) => {
    con.connect(async (err) => {
        let sql = `SELECT * FROM dentists WHERE accepted = 2`;
        con.query(sql, async (err, result) => {
            if (err) throw err
            res.render("rejectedDoctors.ejs", { data: result})
        })
    })
};
let rejectedPost = async (req, res) => {
    const chat_id = req.body.chat_id
    con.connect(async (err) => {
        const sql = `UPDATE dentists SET accepted = 2 WHERE chat_id = '${chat_id}'`;
        con.query(sql, async (err, result) => {
            console.log(`${chat_id} is rejected!`)
            res.redirect("/unaccepteddoctors")
        })
    })
}
module.exports = {
    rejected: rejected,
    rejectedPost: rejectedPost,
};