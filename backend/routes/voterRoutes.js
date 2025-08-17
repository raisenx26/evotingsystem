const express = require('express');
const {
  getVoters,
  addVoter,
  updateVoter,
  deleteVoter,
} = require('../controllers/voterController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// GET all voters
// Admins: all voters, Voters: only their own
router.get('/', protect, getVoters);

// POST a new voter
// Any authenticated user can add themselves
router.post('/', protect, addVoter);

// PUT a voter
// Admins can update any voter, Voters can only update their own
router.put('/:id', protect, updateVoter);

// DELETE a voter

router.delete('/:id', protect, deleteVoter);

// Export the router

module.exports = router;
