import React, { useState } from "react";
import Table from "./components/Table";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import { CONTACTS } from "./data";
import CreateContact from "./components/CreateContact";

function App() {
  const [contacts, setContacts] = useState<
    Array<{
      name: string;
      email: string;
      phone: string;
      address?: string;
    }>
  >(CONTACTS || []);

  const handleDelete = (index: number) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };
  const handleAddContact = (newContact: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  }) => {
    setContacts([newContact, ...contacts]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Manager</h1>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Table data={contacts} onDelete={handleDelete} />}
          />
          <Route
            path="/details/:index"
            element={<DetailsPage data={contacts} />}
          />
          <Route
            path="/create"
            element={<CreateContact onAdd={handleAddContact} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
