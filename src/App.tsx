import React, {useState} from 'react';
import Table from "./components/Table";
import {Route, BrowserRouter as  Router, Routes} from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import {CONTACTS} from "./data";


function App() {
  const [contacts, setContacts] = useState(CONTACTS || []);

  const handleDelete = (index:number) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Manager</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Table data={contacts} onDelete={handleDelete} />} />
          <Route path="/details/:index" element={<DetailsPage data={contacts} />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
