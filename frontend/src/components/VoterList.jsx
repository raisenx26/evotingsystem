import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

export default function VoterList({ voters = [], setVoters, setEditingVoter }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const fmtDate = (d) => (d ? new Date(d).toLocaleString() : '—');

  const userIdOf = (v) =>
    (v.userId && (v.userId._id || v.userId)) || v.createdBy || '—';

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this voter?')) return;
    await axiosInstance.delete(`/api/voters/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setVoters?.((prev) => prev.filter((v) => v._id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[820px] w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">Name</th>
            <th className="text-left p-3 border-b">Email</th>
            <th className="text-left p-3 border-b">Address</th>
            <th className="text-left p-3 border-b">Date of Birth</th>
            <th className="text-left p-3 border-b">Created</th>
            <th className="text-left p-3 border-b w-[240px]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {voters.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-3 text-sm text-gray-600">
                No voters yet.
              </td>
            </tr>
          ) : (
            voters.map((v) => (
              <tr key={v._id} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 border-b">{v.name || '—'}</td>
                <td className="p-3 border-b">{v.email || '—'}</td>
                <td className="p-3 border-b">{v.address || '—'}</td>
                <td className="p-3 border-b">{v.dob || '—'}</td>
                <td className="p-3 border-b">{fmtDate(v.createdAt)}</td>
                <td className="p-3 border-b">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setEditingVoter?.(v)} className="bg-[#A6B28B] text-white px-2 py-2 rounded">
                      Update
                    </button>
                    <button
                      onClick={() =>
                        navigate('/badge', { state: { record: v, userId: userIdOf(v) } })
                      }
                      className="bg-[#A6B28B] text-white px-2 py-2 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="bg-[#A6B28B] text-white px-2 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}