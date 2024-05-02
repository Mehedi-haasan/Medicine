const controller = require("../controller/productTemplate.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });




    app.post("/api/create/product", controller.createProduct);
    app.get("/api/get/product", controller.getProduct);
    app.get("/api/get/product/variant", controller.getProductVariant);
};