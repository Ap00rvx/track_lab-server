const express = require('express');
const router = express.Router();
const {createOrganization,updateMembers} = require("../controller/origanization_controller");
const middleware = require("../middleware/user_middleware");

router.post("/create",middleware,createOrganization); 
router.post("/addMember",middleware,updateMembers); 

module.exports = router;