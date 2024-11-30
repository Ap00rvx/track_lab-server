const express = require('express');
const router = express.Router();
const {createProjectForOrganization,getAllProjectsForOrganization,updateProject,updateComment,addTaskToProject} = require("../controller/project_controller");
const middleware = require("../middleware/user_middleware");

router.get("/allProjects",getAllProjectsForOrganization);
router.post("/create",middleware,createProjectForOrganization);
router.post("/update",middleware,updateProject);
router.post("/addComment",middleware,updateComment);
router.post("/addTask",middleware,addTaskToProject);


module.exports = router;