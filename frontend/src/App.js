import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Voters from './pages/Voters';
import Badge from './pages/Badge';
import ProtectedRoute from './routes/ProtectedRoute';
import VotingPage from './components/VotingPage';
import OfficialResults from './components/OfficialResults';

export default function App() {
  return (
    <Router>
      <Navbar /> {}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/voters" element={<Voters />} />
          <Route path="/badge" element={<Badge />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/results" element={<OfficialResults />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
