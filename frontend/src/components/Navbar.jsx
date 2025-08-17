import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAuthed = !!(user && user.token);
  const roleValue = user ? (user.role || user.userType || user.type) : '';
  const role = String(roleValue || '').toLowerCase();
  const isVoter = role === 'voter';

  return (
    <nav className="bg-[#1C352D] text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
        <img src="/evs.png" alt="Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold">E-Voting System</h1>
        </div>

        <div className="flex items-center gap-3">
          {isAuthed && !isVoter && <NavLink to="/profile">Profile</NavLink>}
          {isAuthed && !isVoter && <NavLink to="/voters">Voters List</NavLink>}
          {isAuthed && !isVoter && <NavLink to="/vote">Candidates</NavLink>}
          {isAuthed && !isVoter && <NavLink to="/results">Official Results</NavLink>}
       

          {!isAuthed && (
            <>
              <button onClick={() => navigate('/login')} className="px-3 py-1 rounded border">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="px-3 py-1 rounded border">
                Register
              </button>
            </>
          )}

          {isAuthed && (
            <button
              onClick={() => {
                logout();
                navigate('/login', { replace: true });
              }}
              className="bg-[#1C352D] px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
    </nav>
  );
}