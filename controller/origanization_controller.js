const  Organization = require('../model/organization_model'); // Update the path as needed
const User = require('../model/user_model'); // Update the path as needed

exports.createOrganization = async (req, res) => {
    const { name, description, address, contact, logo, members, projects, industry, tags } = req.body;
    const createdBy = req.user.id;
    if (!name || !contact || !contact.email || !address || !address.postalCode || !address.country) {
        return res.status(400).json({ error: 'Name, contact email, postal code, and country are required' });
    }

    try {
     
        const user = await User.findById(createdBy);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newOrganization = new Organization({
            name,
            description: description || '',
            address,
            contact,
            logo: logo || '',
            members: members || [],
            projects: projects || [],
            admins: [createdBy], 
            createdBy,
            industry: industry || '',
            tags: tags || [],
        });


        await newOrganization.save();
        user.organizationId = newOrganization._id;
        await user.save();
        res.status(201).json({
            message: 'Organization created successfully',
            organization: {
                id: newOrganization._id,
                name: newOrganization.name,
                description: newOrganization.description,
                address: newOrganization.address,
                contact: newOrganization.contact,
                logo: newOrganization.logo,
                members: newOrganization.members,
                projects: newOrganization.projects,
                admins: newOrganization.admins,
                createdBy: newOrganization.createdBy,
                establishedDate: newOrganization.establishedDate,
                industry: newOrganization.industry,
                tags: newOrganization.tags,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateMembers = async (req, res) => {
    const { members, orgId } = req.body;
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Types.ObjectId;
    const createdBy = req.user.id;
    if (!orgId) {
        return res.status(400).json({ error: 'Organization ID is required' });
    }
        const organization = await Organization.findById(new ObjectId(orgId));
    try {
        // const organization = await Organization.findById(orgId);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        if (!organization.admins.includes(createdBy)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        for (let i = 0; i < members.length; i++) {
            const user = await User.findById(members[i]);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (organization.members.includes(members[i])) {
                return res.status(400).json({ member: members[i],error: 'User already a member' });
            }
            user.organizationId = orgId;
            await user.save();
            organization.members.push(members[i]);

        
        }
        

        await organization.save();
        
        res.status(200).json({
            message: 'Members updated successfully',
            organization: {
                id: organization._id,
                name: organization.name,
                description: organization.description,
                address: organization.address,
                contact: organization.contact,
                logo: organization.logo,
                members: organization.members,
                projects: organization.projects,
                admins: organization.admins,
                createdBy: organization.createdBy,
                establishedDate: organization.establishedDate,
                industry: organization.industry,
                tags: organization.tags,
            },
        });
    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
