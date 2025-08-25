const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Register new user
const registerUser = async (req, res) => {
  const { name, email, password, address, dob, role } = req.body;
  try {
    if (!name || !email || !password || !address || !dob) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Ensure DOB is a valid date
    const parsedDOB = new Date(dob);
    if (isNaN(parsedDOB.getTime())) {
      return res.status(400).json({ message: 'Invalid date of birth' });
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      dob: parsedDOB,
      role: role || 'voter',
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      dob: user.dob.toISOString().split('T')[0],
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      dob: user.dob.toISOString().split('T')[0],
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      name: user.name,
      email: user.email,
      address: user.address,
      dob: user.dob.toISOString().split('T')[0],
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, address, dob } = req.body;

    if (dob && isNaN(new Date(dob).getTime())) {
      return res.status(400).json({ message: 'Invalid date of birth' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.dob = dob ? new Date(dob) : user.dob;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      dob: updatedUser.dob.toISOString().split('T')[0],
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateUserProfile };
