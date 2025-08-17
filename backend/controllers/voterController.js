const Voter = require('../models/Voter');

// GET voters
// Admins: all voters, Voters: only their own
const getVoters = async (req, res) => {
  try {
    const role = String(req.user?.role || '').toLowerCase();
    const query = role === 'admin' ? {} : { userId: req.user.id };
    const voters = await Voter.find(query).sort({ createdAt: -1 });
    res.json(voters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVoter = async (req, res) => {
  const { name, email, address, dob } = req.body;
  try {
    const voter = await Voter.create({
      userId: req.user.id,
      name,
      email,
      address,
      dob,
    });
    res.status(201).json(voter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVoter = async (req, res) => {
  const { name, email, address, dob } = req.body;

  try {
    const voter = await Voter.findById(req.params.id);
    if (!voter) return res.status(404).json({ message: 'Voter not found' });

    const role = String(req.user?.role || '').toLowerCase();

    if (role !== 'admin' && voter.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: cannot update other users' });
    }

    voter.name = name || voter.name;
    voter.email = email || voter.email;
    voter.address = address || voter.address;
    voter.dob = dob || voter.dob;

    const updatedVoter = await voter.save();
    res.json(updatedVoter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVoter = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    if (!voter) return res.status(404).json({ message: 'Voter not found' });

    const role = String(req.user?.role || '').toLowerCase();
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: only admins can delete' });
    }

    await voter.remove();
    res.json({ message: 'Voter deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVoters, addVoter, updateVoter, deleteVoter };
