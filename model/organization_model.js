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
            required: false,
            default: ''
        },
        city: {
            type: String,
            trim: true,
            required: false,
            default: ''
        },
        state: {
            type: String,
            trim: true,
            required: false,default: '',

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
            required: false,
            default: ''

        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        website: {
            type: String,
            trim: true,
            required: false,
            default: ''
        }
    },
    logo: {
        type: String,
        trim: true,
        required: false,
        default: ''
         // URL or path to the logo image
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
    admins:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    establishedDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    industry: {
        type: String,
        trim: true,
        required: false,
        default: ''
    },
    tags: [
        {
            type: String,
            trim: true
        }
    ]
}, {
    timestamps: true 
});

module.exports = mongoose.model('Organization', organizationSchema);
