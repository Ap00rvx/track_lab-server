const  Organization = require('../model/organization_model'); // Update the path as needed
const User = require('../model/user_model'); //
const Project = require("../model/project_model"); 
const mongoose = require('mongoose');
const Task = require("../model/task_model");
const ObjectId = mongoose.Types.ObjectId;


exports.createProjectForOrganization = async(req, res) => {
    try{
        const creater = req.user.id; 
        const orgId  = req.header("orgId");
        const org = await Organization.findById(new ObjectId(orgId)); 
        if(!org){
            return res.status(400).json({"error":"Organization not found"});
        }
        if(org.createdBy == creater || org.admins.includes(creater)){
            const {name, description, startDate } = req.body;
            if(!name || !description || !startDate ){
                return res.status(400).json({"error":"All fields are required"});
            }
            const project = new Project({
                name:name,
                description:description,
                startDate:startDate,
                organizationId:orgId,
                createdBy:creater,
            });
            await project.save();
            org.projects.push(project._id);
            await org.save();
            res.status(201).json({"message":"Project created successfully","project":project});
        
        }
        else{
            return res.status(401).json({"error":"Unauthorized access"});
        }


        
    }catch(err){
        console.log(err);
        res.status(500).json({"error":"Internal Server Error"});
    }
}
exports.getAllProjectsForOrganization = async(req, res) => {
    try{

        const orgId  = req.header("orgId");
        const org = await Organization.findById(new ObjectId(orgId)); 
        if(!org){
            return res.status(400).json({"error":"Organization not found"});
        }
   
        const projects = await Project.find({organizationId:orgId});
           return  res.status(200).json({"projects":projects});
        
        
        
    }catch(err){
        console.log(err);
        res.status(500).json({"error":"Internal Server Error"});
    }
}
exports.updateProject = async(req, res) => {
    try{
        const creater = req.user.id; 
        const projectId  = req.header("projectId");
        const project = await Project.findById(new ObjectId(projectId));
        if(!project){
            return res.status(400).json({"error":"Project not found"});
        }
        const org = await Organization.findById(new ObjectId(project.organizationId));
        if(!org){
            return res.status(400).json({"error":"Organization not found"});
        }
        if(org.createdBy == creater || org.admins.includes(creater) || project.createdBy == creater){
            const {name, description, startDate, endDate, status, projectManager, contributors, teamMembers ,budget, priority,tags} = req.body;
            if(name){
                project.name = name;
            }
            if(description){
                project.description = description;
            }
            if(startDate){
                project.startDate = startDate;
            }
            if(endDate){
                project.endDate = endDate;
            }
            if(status){
                project.status = status;
            }
            if(projectManager){
                project.projectManager = projectManager;
                let user = await User.findById(new ObjectId(projectManager));
                if(!user){
                    return res.status(400).json({"error":"Project Manager not found"});
                }
                user.role = "project manager";
                if(!user.projectIds.includes(project._id)){
                user.projectIds.push(project._id);}
                await user.save();
                if(!project.teamMembers.includes(projectManager)){
                    project.teamMembers.push(projectManager);
                }
             
            }
            if(contributors){
                project.contributors = contributors;
            }
            if(teamMembers){
                project.teamMembers = teamMembers;
                project.teamMembers.push(projectManager);
            }
            if(budget){
                project.budget = budget;
            }
            if(priority){
                project.priority = priority;
            }
            if(tags){
                project.tags = tags;
            }

            await project.save();
            res.status(200).json({"message":"Project updated successfully","project":project});
        
        }
        else{
            return res.status(401).json({"error":"Unauthorized access"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({"error":"Internal Server Error"});
    }
}
exports.updateComment = async(req, res) => {
    const userId = req.user.id;
    const {comment , progress} = req.body;
    const projectId  = req.header("projectId");
    const project = await Project.findById(new ObjectId(projectId));
    try {
    if(!project){
        return res.status(400).json({"error":"Project not found"});
    }
    const org = await Organization.findById(new ObjectId(project.organizationId));
    if(!org){
        return res.status(400).json({"error":"Organization not found"});
    }
    if(org.createdBy == userId || project.teamMembers.includes(userId) || project.createdBy == userId){
        if(comment){
        project.comments.push({user:userId,comment:comment});
        }
        if(progress){
        project.progress = progress;
        }
        await project.save();
        return res.status(200).json({"message":"Comment added successfully","project":project});
    }
    else{
        return res.status(401).json({"error":"Unauthorized access"});
    }}
    catch(err){
        console.log(err);
        res.status(500).json({"error":"Internal Server Error"});
    }
}
exports.addTaskToProject = async(req, res) => {
    try{
        const creater = req.user.id; 
        const projectId  = req.header("projectId");
        const project = await Project.findById(new ObjectId(projectId));
        if(!project){
            return res.status(400).json({"error":"Project not found"});
        }
        const org = await Organization.findById(new ObjectId(project.organizationId));
        if(!org){
            return res.status(400).json({"error":"Organization not found"});
        }
        if(org.createdBy == creater || org.admins.includes(creater) || project.createdBy == creater ||project.teamMembers.includes(creater)){
            const {name, description, dueDate, status, assignedTo} = req.body;
            if(!name || !description || !dueDate  ){
                return res.status(400).json({"error":"All fields are required"});
            }
            const task = new Task({
                name:name,
                description:description,
                dueDate:dueDate,
                projectId:projectId,
                createdBy:creater,
                assignedTo:assignedTo || null ,
                status:status,
            });
            await task.save();
            project.tasks.push(task._id);
            await project.save();
            res.status(201).json({"message":"Task created successfully","task":task});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({"error":"Internal Server Error"});
    }
}
exports.getAllTasksForProject = async(req, res) => {
    try{
        const projectId  = req.header("projectId");
        const project = await Project.findById(new ObjectId(projectId));
        if(!project){
            return res.status(400).json({"error":"Project not found"});
        }
        const org = await Organization.findById(new ObjectId(project.organizationId));
        if(!org){
            return res.status(400).json({"error":"Organization not found"});
        }
        const tasks  = await Task.find({projectId:projectId});
        return res.status(200).json({"tasks":tasks});
    }
    catch(err){
        console.log(err);
        res.status(500).json({"error":"Internal Server Error"});
    }
}
exports.updateTask = async(req, res) => {
    try{
        const creater = req.user.id; 
        const taskId  = req.header("taskId");
        const task = await Task.findById(new ObjectId(taskId));
        if(!task){
            return res.status(400).json({"error":"Task not found"});
        }
        const project = await Project.findById(new ObjectId(task.projectId));
        if(!project){
            return res.status(400).json({"error":"Project not found"});
        }
        const org = await Organization.findById(new ObjectId(project.organizationId));
        if(!org){
            return res.status(400).json({"error":"Organization not found"});
        }
        if(org.createdBy == creater || org.admins.includes(creater) || project.createdBy == creater ||project.teamMembers.includes(creater)){
            const {name, description, dueDate, status, assignedTo} = req.body;
            if(name){
                task.name = name;
            }
            if(description){
                task.description = description;
            }
            if(dueDate){
                task.dueDate = dueDate;
            }
            if(status){
                task.status = status;
            }
            if(assignedTo){
                task.assignedTo = assignedTo;
            }
            await task.save();
            res.status(200).json({"message":"Task updated successfully","task":task});
        }
        else{
            return res.status(401).json({"error":"Unauthorized access"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({"error":"Internal Server Error"});
    }
}