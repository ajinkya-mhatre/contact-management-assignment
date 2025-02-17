import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailsPage = ({ data }: { data: { name: string; email: string; phone: string }[] }) => {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const item = index !== undefined ? data[parseInt(index, 10)] : null;

  if (!item) {
    return <p className="text-center text-red-500">User not found</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Details</h2>
      <p className="text-gray-600"><strong>Name:</strong> {item.name}</p>
      <p className="text-gray-600"><strong>Email:</strong> {item.email}</p>
      <p className="text-gray-600"><strong>Phone:</strong> {item.phone}</p>

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300"
      >
        Back to Table
      </button>
    </div>
  );
};

export default DetailsPage;
