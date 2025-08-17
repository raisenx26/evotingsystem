// controllers/voterController.js
const User = require('../models/User');

// Controller to create a user (task = voter in this context)
const createTask = async (req, res) => {
  try {
    const { name, email, password, address, dob, role } = req.body;

    // Validate DOB
    const parsedDOB = new Date(dob);
    if (isNaN(parsedDOB.getTime())) {
      return res.status(400).json({ message: 'Invalid date of birth' });
    }

    // Create user in DB
    const user = await User.create({
      name,
      email,
      password,
      address,
      dob: parsedDOB,
      role: role || 'voter',
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTask };
