import React from "react";

const ContactList = ({ contacts, selectedIndexes, searchTerm, setSearchTerm, handleEdit, handleDelete, handleSelect, handleBulkDelete }) => {
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <>
      <input
        className="search-box"
        type="text"
        placeholder="🔍 جستجو در مخاطبین..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {selectedIndexes.length > 0 && (
        <button style={{ backgroundColor: "#e53e3e" }} onClick={handleBulkDelete}>
          🗑️ حذف گروهی مخاطبین
        </button>
      )}

      <ul>
        {filtered.map((contact, index) => (
          <li key={index} className="contact-item">
            <input
              type="checkbox"
              checked={selectedIndexes.includes(index)}
              onChange={() => handleSelect(index)}
            />
            {contact.name} - {contact.email} - {contact.phone}
            <div>
              <button className="edit-button" onClick={() => handleEdit(index)}>✏️</button>
              <button className="delete-button" onClick={() => handleDelete(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;