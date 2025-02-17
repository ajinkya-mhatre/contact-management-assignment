import React from "react";
import { useNavigate } from "react-router-dom";

const Table = ({
  data,
  onDelete,
}: {
  data: { name: string; email: string; phone: string }[];
  onDelete: (index: number) => void;
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = data.filter((contact) =>
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded"
        />
        <button
          onClick={() => navigate("/create")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all duration-300"
        >
          + Create New
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.email}</td>
                <td className="py-3 px-6">{item.phone}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => navigate(`/details/${index}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-all duration-300 mr-2"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {item.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {item.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> {item.phone}
            </p>
            <div className="mt-3 flex justify-end space-x-2">
              <button
                onClick={() => navigate(`/details/${index}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-all duration-300"
              >
                Details
              </button>
              <button
                onClick={() => onDelete(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
