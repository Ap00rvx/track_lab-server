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
