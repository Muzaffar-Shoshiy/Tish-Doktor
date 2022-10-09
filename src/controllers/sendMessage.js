const mysql = require("mysql");
require("dotenv").config()
const axios = require("axios")
let con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

let sendMessage = async (req, res) => {
    return res.render("sendMessage.ejs");
};
let sendMessagePost = (req, res) => {
    const { message, chat_id } = req.body
    const url = `https://api.telegram.org/bot${process.env.api}/sendMessage?chat_id=${chat_id}&text=${message}`;
    axios(url)
        .then(
            success => {
                res.redirect("/unaccepteddoctors")
            },
            error => {
                // console.log(error)
                res.redirect("/unaccepteddoctors")
            })
}
module.exports = {
    sendMessage: sendMessage,
    sendMessagePost: sendMessagePost,
};