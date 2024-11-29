const express = require('express');
const router = express.Router();
const {registerUser} = require("../controller/user_controller");

router.post('/register',registerUser);

module.exports = router;