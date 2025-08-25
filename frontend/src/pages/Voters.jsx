import { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import VoterForm from '../components/VoterForm';
import VoterList from '../components/VoterList';
import VotingPage from '../components/VotingPage';
import { useAuth } from '../context/AuthContext';

const Voters = () => {
  const { user } = useAuth();

  const isVoter = useMemo(() => {
    const role = (user?.role || user?.userType || user?.type || '').toString().toLowerCase();
    return role === 'voter';
  }, [user]);

  const [voters, setVoters] = useState([]);
  const [editingVoter, setEditingVoter] = useState(null);

  useEffect(() => {
    
    if (!user?.token || isVoter) return;

    let cancelled = false;

    (async () => {
      try {
        const response = await axiosInstance.get('/api/voters', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!cancelled) setVoters(response.data);
      } catch (error) {
        const status = error?.response?.status;
    
        if (status !== 401 && status !== 403) {
          console.warn('Failed to fetch voters.', error);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isVoter]);

  if (!user?.token) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto p-6">

    {/* Show VoterForm ONLY if admin */}
    {!isVoter && (

      <VoterForm
        voters={voters}
        setVoters={setVoters}           
        editingVoter={editingVoter}
        setEditingVoter={setEditingVoter}
        isVoter={isVoter}
        user={user}                        
      />
    )}

    {/* If voter -> show VotingPage */}
    {isVoter && <VotingPage user={user} />}

    {/* If admin -> show VoterList */}
      {!isVoter && (
        <VoterList
          voters={voters}
          setVoters={setVoters}
          setEditingVoter={setEditingVoter}
        />
      )}
    </div>
  );
};

export default Voters;
