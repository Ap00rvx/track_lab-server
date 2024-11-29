const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    address: {
        street: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        state: {
            type: String,
            trim: true,
            required: true
        },
        postalCode: {
            type: String,
            trim: true,
            required: true
        },
        country: {
            type: String,
            trim: true,
            required: true
        }
    },
    contact: {
        phone: {
            type: String,
            trim: true,
            required: false
        },
        email: {
            type: String,
            trim: true,
            required: false
        },
        website: {
            type: String,
            trim: true,
            required: false
        }
    },
    logo: {
        type: String,
        trim: true,
        required: false // URL or path to the logo image
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    establishedDate: {
        type: Date,
        required: false
    },
    industry: {
        type: String,
        trim: true,
        required: false
    },
    tags: [
        {
            type: String,
            trim: true
        }
    ]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Organization', organizationSchema);
