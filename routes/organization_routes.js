const express = require('express');
const router = express.Router();
const {createOrganization} = require("../controller/origanization_controller");
const middleware = require("../middleware/user_middleware");

router.post("/create",middleware,createOrganization); 

module.exports = router;