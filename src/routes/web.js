const express = require("express");
const homePageController = require("../controllers/homePageController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");
const tablePageController = require("../controllers/tablePageController");
const rejectedDoctors = require("../controllers/rejectedDoctors");
// const apiController = require("../controllers/apiController");
const sendMessage = require("../controllers/sendMessage")

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/unaccepteddoctors", loginController.checkLoggedIn, tablePageController.tables);
    router.post("/unaccepteddoctors", loginController.checkLoggedIn, tablePageController.tablePost);
    router.get("/accepteddoctors", loginController.checkLoggedIn, tablePageController.tableAccepted);
    router.get("/rejecteddoctors", loginController.checkLoggedIn, rejectedDoctors.rejected);
    router.get("/sendmessage", loginController.checkLoggedIn, sendMessage.sendMessage);
    router.post("/sendmessage", loginController.checkLoggedIn, sendMessage.sendMessagePost);
    router.post("/rejecteddoctors", loginController.checkLoggedIn, rejectedDoctors.rejectedPost);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login", 
        successFlash: true,
        failureFlash: true
    }));
    

    // router.get("/register", registerController.getPageRegister);
    // router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};
module.exports = initWebRoutes;
