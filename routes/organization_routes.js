const express = require('express');
const router = express.Router();
const {createOrganization,updateMembers,deleteMember,updateMemberRole,getOrganization} = require("../controller/origanization_controller");
const middleware = require("../middleware/user_middleware");
router.get("/",getOrganization);
router.post("/create",middleware,createOrganization); 
router.post("/addMember",middleware,updateMembers); 
router.post("/removeMember",middleware,deleteMember); 
router.post("/updateRole",middleware,updateMemberRole); 

module.exports = router;