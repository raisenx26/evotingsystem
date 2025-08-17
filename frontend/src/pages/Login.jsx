import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // Save JWT token
      login(response.data, formData.remember);

      // Redirect to voters page (or dashboard)
      navigate('/voters');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">E-Voting System</h1>
        <p className="text-gray-600 mb-4 text-center">Sign in to your account</p>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          required
        />

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="mr-2"
            />
            Remember Me
          </label>
          <a href="/forgot-password" className="text-sm text-green-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded text-white font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#A6B28B] hover:bg-gray-400'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
