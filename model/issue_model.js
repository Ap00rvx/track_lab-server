const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'in progress', 'resolved', 'closed'],
        default: 'open'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    dueDate: {
        type: Date,
        required: false
    },
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
    ],
    attachments: [
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
    resolution: {
        type: String,
        trim: true,
        required: false
    },
    resolutionDate: {
        type: Date,
        required: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Issue', issueSchema);
