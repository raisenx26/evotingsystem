import { useLocation, Navigate, Link } from 'react-router-dom';

export default function Badge() {
  const { state } = useLocation();
  const rec = state?.record || null;
  const userId = state?.userId || null;

  // If someone opens /badge directly with no state, send them back
  if (!rec) return <Navigate to="/voters" replace />;

  const badgeId = rec.badgeId || rec._id || userId || 'N/A';

  return (
    <div className="w-1/2 md:w-full ...">
      <div className="bg-white dark:bg-gray-200 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <h1 className="text-xl font-semibold mb-3">Voter Information Record</h1>

        <dl className="list-none md:list-disc ...">
          <div className="flex">
            <dt className="w-32 font-medium">Name:</dt>
            <dd className="flex-1">{rec.name || '—'}</dd>
          </div>
          <div className="flex">
            <dt className="w-32 font-medium">Email:</dt>
            <dd className="flex-1">{rec.email || '—'}</dd>
          </div>
          <div className="flex">
            <dt className="w-32 font-medium">Address:</dt>
            <dd className="flex-1">{rec.address || '—'}</dd>
          </div>
          <div className="flex">
            <dt className="w-32 font-medium">Date of Birth:</dt>
            <dd className="flex-1">{rec.dob || '—'}</dd>
          </div>
          <div className="flex">
            <dt className="w-32 font-medium">Badge ID:</dt>
            <dd className="flex-1">{badgeId}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-4">
        <Link to="/voters" className="px-3 py-1 rounded border">
          Back
        </Link>
      </div>
    </div>
  );
}