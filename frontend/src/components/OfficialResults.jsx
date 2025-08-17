import React, { useState } from "react";

const initialResults = [
  { id: 1, name: "Jose Protacio Mercado Rizal y Alonso Realonda", party: "Unity Party", votes: 126 },
  { id: 2, name: "Francisco Balagtas Baltazar", party: "Liberal Party", votes: 121 },
  { id: 3, name: "Tandang Sora Martires", party: "Independent", votes: 133 },
];

export default function OfficialResults() {
  const [results] = useState(initialResults);

  const totalVotes = results.reduce((sum, cand) => sum + cand.votes, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Partial and Unofficial Results
        </h1>
        <p class="text-center mb-3">As of 17 August of 2025</p>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 border-b text-left">#</th>
                <th className="p-3 border-b text-left">Candidate</th>
                <th className="p-3 border-b text-left">Party</th>
                <th className="p-3 border-b text-left">Votes</th>
                <th className="p-3 border-b text-left">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {results.map((cand, index) => (
                <tr
                  key={cand.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{cand.name}</td>
                  <td className="p-3 border-b">{cand.party}</td>
                  <td className="p-3 border-b">{cand.votes}</td>
                  <td className="p-3 border-b">
                    {((cand.votes / totalVotes) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center text-lg font-bold">
          Total Votes: {totalVotes}
        </div>
      </div>
    </div>
  );
}
