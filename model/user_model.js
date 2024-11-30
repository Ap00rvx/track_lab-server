const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    username:{
        type: String,
        required: true,
        trim: true,
        unique:true, 
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'project manager', 'developer', 'tester', 'client', 'viewer'],
      default: 'viewer',
      required: true,
      trim: true,
    },
    image:{
      type: String,
      required: false,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      required: true,
      trim: true,
    },
    organizationId: {
     type :String,
      default: null, 
      required: false,
    },
    projectIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        default:[]
      },
    ],
    issueAssignedId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
        required: true,
        default:[]
      },
    ],
  },
  {
    timestamps: true, 
  }
);



module.exports = mongoose.model('User', UserSchema);
