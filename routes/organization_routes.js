const express = require('express');
const router = express.Router();
const {createOrganization,updateMembers,deleteMember} = require("../controller/origanization_controller");
const middleware = require("../middleware/user_middleware");

router.post("/create",middleware,createOrganization); 
router.post("/addMember",middleware,updateMembers); 
router.post("/removeMember",middleware,deleteMember); 

module.exports = router;