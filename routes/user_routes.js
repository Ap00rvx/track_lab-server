const express = require('express');
const router = express.Router();
const {registerUser, loginUser,profile} = require("../controller/user_controller");
const middleware = require("../middleware/user_middleware");

router.post('/register',registerUser);
router.post('/login',loginUser);

router.get("/profile",middleware,profile); 

module.exports = router;