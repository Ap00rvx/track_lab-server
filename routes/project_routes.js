const express = require('express');
const router = express.Router();
const {createProjectForOrganization,getAllProjectsForOrganization,updateProject} = require("../controller/project_controller");
const middleware = require("../middleware/user_middleware");

router.get("/allProjects",getAllProjectsForOrganization);
router.post("/create",middleware,createProjectForOrganization);
router.post("/update",middleware,updateProject);


module.exports = router;