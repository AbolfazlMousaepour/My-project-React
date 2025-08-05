import { useState, useEffect } from "react";
import { getContacts, saveContacts } from "./utils/storage";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./index.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const handleAddOrUpdate = (data) => {
    const updated = [...contacts];
    if (editIndex !== null) {
      updated[editIndex] = data;
      setMessage("✏️ مخاطب ویرایش شد.");
    } else {
      updated.push(data);
      setMessage("✅ مخاطب افزوده شد.");
    }

    setContacts(updated);
    saveContacts(updated);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setMessage("🔧 در حال ویرایش مخاطب");
  };

  const handleDelete = (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
    saveContacts(updated);
    setMessage("🗑️ مخاطب حذف شد.");

    if (editIndex === index) setEditIndex(null);
    setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
  };

  const handleSelect = (index) => {
    setSelectedIndexes(
      selectedIndexes.includes(index)
        ? selectedIndexes.filter((i) => i !== index)
        : [...selectedIndexes, index]
    );
  };

  const handleBulkDelete = () => {
    const updated = contacts.filter((_, i) => !selectedIndexes.includes(i));
    setContacts(updated);
    saveContacts(updated);
    setSelectedIndexes([]);
    setMessage("✅ مخاطبین حذف شدند");
  };

  const defaultValues = editIndex !== null ? contacts[editIndex] : { name: "", email: "", phone: "" };

  return (
    <div className="container">
      <h2>📇 لیست مخاطبین</h2>
      <ContactForm
        onSubmit={handleAddOrUpdate}
        defaultValues={defaultValues}
        isEditing={editIndex !== null}
      />
      <p className="message">{message}</p>
      <ContactList
        contacts={contacts}
        selectedIndexes={selectedIndexes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSelect={handleSelect}
        handleBulkDelete={handleBulkDelete}
      />
    </div>
  );
}

export default App;