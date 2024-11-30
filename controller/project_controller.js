const  Organization = require('../model/organization_model'); // Update the path as needed
const User = require('../model/user_model'); //
const Project = require("../model/project_model"); 
const mongoose = require('mongoose');
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