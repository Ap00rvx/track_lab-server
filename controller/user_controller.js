const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/user_model"); // Update path as necessary
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET; 

exports.registerUser = async (req, res) => {
  const { username, fullName, email, password, role } = req.body;

  if (!username || !fullName || !email || !password ) {
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
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' }); 
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' }); 
        }

        // Generate JWT payload
        const payload = {
            user: {
                id: user._id,
                username: user.name,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
            },
        };

        // Sign and return the token
        jwt.sign(
            payload,
            secret,
            { expiresIn: '150d' },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ error: 'Error generating token' }); 
                }
                res.status(200).json({
                    message: "User login successful",
                    token,
                    user: payload,
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: 'Internal Server Error' }); 
    }
};
