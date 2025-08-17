import React, { useState } from "react";

const initialCandidates = [
  { id: 1, name: "Jose Protacio Mercado Rizal y Alonso Realonda", party: "Unity Party" },
  { id: 2, name: "Francisco Baltazar", party: "Liberal Party" },
  { id: 3, name: "Tandang Sora", party: "Independent" },
];

export default function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [submittedVote, setSubmittedVote] = useState(null);

  const handleSelect = (id) => {
    setSelectedCandidate(id);
  };

  const handleSubmit = () => {
    if (selectedCandidate === null) {
      alert("Please select a candidate to proceed!");
      return;
    }
    setSubmittedVote(selectedCandidate);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Official Candidates
        </h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 border-b text-left">#</th>
                <th className="p-3 border-b text-left">Candidate</th>
                <th className="p-3 border-b text-left">Party List</th>
                <th className="p-3 border-b text-left">Select</th>
              </tr>
            </thead>
            <tbody>
              {initialCandidates.map((cand, index) => (
                <tr
                  key={cand.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{cand.name}</td>
                  <td className="p-3 border-b">{cand.party}</td>
                  <td className="p-3 border-b">
                    <input
                      type="radio"
                      name="candidate"
                      checked={selectedCandidate === cand.id}
                      onChange={() => handleSelect(cand.id)}
                      className="h-5 w-5"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-[#A6B28B] text-white px-6 py-2 rounded hover:bg-gray-400"
          >
            Submit Vote
          </button>
        </div>

        {submittedVote && (
          <div className="mt-6 text-center text-xl font-semibold text-gray-700">
            You voted for:{" "}
            {
              initialCandidates.find((cand) => cand.id === submittedVote).name
            }
          </div>
        )}
      </div>
    </div>
  );
}
