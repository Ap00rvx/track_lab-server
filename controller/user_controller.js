const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/user_model"); // Update path as necessary
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET; 

exports.registerUser = async (req, res) => {
  const { username, fullName, email, password, role, organizationId } = req.body;

  if (!username || !fullName || !email || !password || !organizationId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
        username:username,
      name: fullName,
      email,
      password,
      role: role || 'viewer', 
      organizationId,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
    };

    const token = jwt.sign(payload, secret, { expiresIn: '150d' });
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
      note: 'OTP has been sent to your email for verification.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
