import ContactProvider from "./context/ContactProvider";
import ContactForm from "./components/ContactForm";
import ContactContext from "./context/ContactContext";
import { useContext } from "react";
import "./index.css";

const ContactList = () => {
  const {
    contacts,
    searchTerm,
    setSearchTerm,
    message,
    handleDelete,
    handleEdit
  } = useContext(ContactContext);

  const filteredContacts = contacts.filter(
    c =>
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
        onChange={e => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredContacts.map((contact, index) => (
          <li key={contact.id} className="contact-item">
            {contact.name} - {contact.email} - {contact.phone}
            <div>
              <button className="edit-button" onClick={() => handleEdit(index)}>✏️ ویرایش</button>
              <button className="delete-button" onClick={() => handleDelete(index)}>❌ حذف</button>
            </div>
          </li>
        ))}
      </ul>

      <p className="message">{message}</p>
    </>
  );
};

const App = () => (
  <ContactProvider>
    <div className="container">
      <h2>📇 لیست مخاطبین</h2>
      <ContactForm />
      <ContactList />
    </div>
  </ContactProvider>
);

export default App;