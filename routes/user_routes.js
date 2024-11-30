const express = require('express');
const router = express.Router();
const {registerUser, loginUser,profile,updateProfile,fetchProfiles} = require("../controller/user_controller");
const middleware = require("../middleware/user_middleware");

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/fetch',fetchProfiles);

router.get("/profile",middleware,profile); 
router.get("/update",middleware,updateProfile); 

module.exports = router;