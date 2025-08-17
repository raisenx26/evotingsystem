import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const VoterForm = ({ voters, setVoters, editingVoter, setEditingVoter }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', address: '', dob: '' });

  useEffect(() => {
    if (editingVoter) {
      setFormData({
        name: editingVoter.name || '',
        email: editingVoter.email || '',
        address: editingVoter.address || '',
        dob: editingVoter.dob || '',
      });
    } else {
      setFormData({ name: '', email: '', address: '', dob: '' });
    }
  }, [editingVoter]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user || !user.token) throw new Error('Not authorized');

      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      if (editingVoter) {
        const { data } = await axiosInstance.put(`/api/voters/${editingVoter._id}`, formData, config);
        setVoters(voters.map(v => (v._id === data._id ? data : v)));
        setEditingVoter(null);
      } else {
        const { data } = await axiosInstance.post('/api/voters', formData, config);
        setVoters([...(voters || []), data]);
        setFormData({ name: '', email: '', address: '', dob: '' });
      }

      // Redirect to badge page
      navigate('/badge', { state: { record: formData, userId: user._id } });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save voter.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingVoter ? 'Update Voter' : 'Voter Registration Form'}
      </h1>

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <button type="submit" className="w-full bg-[#1C352D] text-white p-2 rounded">
        {editingVoter ? 'Update Voter' : 'Add New Voter'}

      </button>
    </form>
  );
};

export default VoterForm;
