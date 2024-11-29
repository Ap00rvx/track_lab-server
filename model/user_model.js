const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      required: true,
      trim: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    projectIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
      },
    ],
    issueAssignedId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
        required: true,
      },
    ],
  },
  {
    timestamps: true, 
  }
);


UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
