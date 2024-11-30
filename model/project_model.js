const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
    link:{
        type: String,
        required: false,
        trim:false,
        default: '',
    },
    version:{
        type: String,
        required: false,  
        default :'0.0.1',
    },
    progress:{
        type: Number,
        required: false,
        default: 0,
    },
    
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: false,
        default: null

    },
    status: {
        type: String,
        enum: ['active', 'completed', 'on hold', 'archived'],
        default: 'active'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    },
    contributors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    teamMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    budget: {
        type: Number,
        required: false,
        default: 0
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    milestones: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            },
            dueDate: {
                type: Date,
                required: true
            },
            status: {
                type: String,
                enum: ['not started', 'in progress', 'completed'],
                default: 'not started'
            }
        }
    ],
    tags: [
        {
            type: String,
            trim: true
        }
    ],
    documents: [
        {
            name: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            uploadedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
