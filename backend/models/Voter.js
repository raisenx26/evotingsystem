
const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    
}, {timestamps: true});

module.exports = mongoose.model('Voter', voterSchema);