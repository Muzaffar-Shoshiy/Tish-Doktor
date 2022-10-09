const mysql = require("mysql");
require("dotenv").config()
let con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

let handleHelloWorld = async (req, res) => {
    con.connect(async (err) => {
        // if (err) throw err
        let sql = `SELECT * FROM users`;
        con.query(sql, async (err, result) => {
            if (err) throw err
            let sql = `SELECT * FROM dentists WHERE accepted = 0`;
            con.query(sql, async (err, result1) => { 
                let sql = `SELECT * FROM dentists WHERE accepted = 1`;
                con.query(sql, async (err, result2) => {
                    let sql = `SELECT * FROM dentists WHERE city = "Toshkent shahar" AND accepted = 1`;
                    con.query(sql, async (err, result3) => {
                        let sql = `SELECT * FROM dentists WHERE city = "Toshkent viloyati" AND accepted = 1`;
                        con.query(sql, async (err, result4) => {
                            let sql = `SELECT * FROM dentists WHERE city = "Andijon viloyati" AND accepted = 1`;
                            con.query(sql, async (err, result5) => {
                                let sql = `SELECT * FROM dentists WHERE city = "Namangan viloyati" AND accepted = 1`;
                                con.query(sql, async (err, result6) => {
                                    let sql = `SELECT * FROM dentists WHERE city = "Farg'ona viloyati" AND accepted = 1`;
                                    con.query(sql, async (err, result7) => {
                                        let sql = `SELECT * FROM dentists WHERE city = "Sirdaryo viloyati" AND accepted = 1`;
                                        con.query(sql, async (err, result8) => {
                                            let sql = `SELECT * FROM dentists WHERE city = "Jizzax viloyati" AND accepted = 1`;
                                            con.query(sql, async (err, result9) => {
                                                let sql = `SELECT * FROM dentists WHERE city = "Samarqand viloyati" AND accepted = 1`;
                                                con.query(sql, async (err, result10) => {
                                                    let sql = `SELECT * FROM dentists WHERE city = "Surxondaryo viloyati" AND accepted = 1`;
                                                    con.query(sql, async (err, result11) => {
                                                        let sql = `SELECT * FROM dentists WHERE city = "Qashqadaryo viloyati" AND accepted = 1`;
                                                        con.query(sql, async (err, result12) => {
                                                            let sql = `SELECT * FROM dentists WHERE city = "Navoiy viloyati" AND accepted = 1`;
                                                            con.query(sql, async (err, result13) => {
                                                                let sql = `SELECT * FROM dentists WHERE city = "Buxoro viloyati" AND accepted = 1`;
                                                                con.query(sql, async (err, result14) => {
                                                                    let sql = `SELECT * FROM dentists WHERE city = "Xorazm viloyati" AND accepted = 1`;
                                                                    con.query(sql, async (err, result15) => {
                                                                        let sql = `SELECT * FROM dentists WHERE accepted = 2`;
                                                                        con.query(sql, async (err, result16) => {
                                                                            return res.render("index.ejs", { data: result, data_1: result1, data_2: result2, data_3: result3, data4: result4, data5: result5, data6: result6, data7: result7, data8: result8, data9: result9, data10: result10, data11: result11, data12: result12, data13: result13, data14: result14, data15: result15, data_r: result16 })
                                                                        })  
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};
