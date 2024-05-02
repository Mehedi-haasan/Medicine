const jwt = require('../middleware/authentication')
const controller = require("../controller/productTemplate.controller");
const auth = require('../controller/auth.controller')

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // app.get("/hobbiess", controller.getHobbis);


    app.post("/api/auth/signup", auth.signUp);
    app.post("/api/auth/signin", auth.signIn);
    // app.get("/api/get/users", [jwt.verifyToken], controller.getUsers);

};