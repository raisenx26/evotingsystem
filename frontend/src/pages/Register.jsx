import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    dob: '',
    role: 'voter',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, address, dob } = formData;
    if (!name || !email || !password || !address || !dob) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="voter">Voter</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#A6B28B] text-white p-2 rounded hover:bg-gray-400"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
