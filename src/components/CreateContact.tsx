import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequiredIndicator = () => <span className="ml-1 text-red-500">*</span>;

const CreateContact = ({
  onAdd,
}: {
  onAdd: (contact: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  }) => void;
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, address: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { name: "", email: "", phone: "" };
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (
      !formData.email.trim() ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = "Valid email is required";
      valid = false;
    }
    if (!formData.phone.trim() || !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only numbers";
      valid = false;
    }
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    onAdd(formData);
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-xl font-semibold mb-4">Create New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Name <RequiredIndicator />
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Email <RequiredIndicator />
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Phone <RequiredIndicator />
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="phone"
            value={formData.address}
            onChange={handleAddressChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Save Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContact;
