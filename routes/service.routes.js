const router = require("express").Router();

const getServices = require("../controllers/service.controller.js");
router.get("/service", getServices);


module.exports = router;