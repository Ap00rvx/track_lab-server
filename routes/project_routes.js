const express = require('express');
const router = express.Router();
const {createProjectForOrganization,getAllProjectsForOrganization} = require("../controller/project_controller");
const middleware = require("../middleware/user_middleware");

router.get("/allProjects",getAllProjectsForOrganization);
router.post("/create",middleware,createProjectForOrganization);


module.exports = router;