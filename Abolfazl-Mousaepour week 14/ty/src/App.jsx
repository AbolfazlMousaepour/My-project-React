import { useState } from "react";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const validateName = name =>
    /^[\u0600-\u06FFa-zA-Z\s]+$/.test(name) && name.length >= 7;
  const validateEmail = email => email.includes("@gmail.com");
  const validatePhone = phone => /^\d{11}$/.test(phone);

  const isFormValid =
    validateName(formData.name) &&
    validateEmail(formData.email) &&
    validatePhone(formData.phone);

  const handleChange = e => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    const newErrors = { ...errors };
    if (name === "name") {
      newErrors.name = !validateName(value)
        ? value.length < 7
          ? "شما کمتر از ۷ کارکتر وارد کردید"
          : "نام باید فقط شامل حروف باشد"
        : null;
    }
    if (name === "email") {
      newErrors.email = !validateEmail(value)
        ? "لطفا یک جیمیل معتبر وارد کنید"
        : null;
    }
    if (name === "phone") {
      newErrors.phone = !validatePhone(value)
        ? "شماره تلفن معتبر وارد کنید لطفا"
        : null;
    }

    setErrors(newErrors);
    setMessage("");
  };

  const handleAddOrUpdate = () => {
    if (!isFormValid) {
      setMessage("⚠️ لطفاً اطلاعات معتبر وارد کنید.");
      return;
    }

    if (editIndex !== null) {
      const updatedList = [...contacts];
      updatedList[editIndex] = formData;
      setContacts(updatedList);
      setMessage("✏️ مخاطب با موفقیت ویرایش شد.");
    } else {
      setContacts([...contacts, formData]);
      setMessage("✅ مخاطب با موفقیت افزوده شد!");
    }

    setFormData({ name: "", email: "", phone: "" });
    setErrors({});
    setEditIndex(null);
  };

  const handleDelete = index => {
    setContacts(contacts.filter((_, i) => i !== index));
    setMessage("🗑️ مخاطب حذف شد.");
    if (editIndex === index) {
      setFormData({ name: "", email: "", phone: "" });
      setEditIndex(null);
    }
    setSelectedIndexes(selectedIndexes.filter(i => i !== index));
  };

  const handleEdit = index => {
    setFormData(contacts[index]);
    setEditIndex(index);
    setMessage("🔧 در حال ویرایش مخاطب هستید.");
  };

  const handleSelect = index => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter(i => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const handleBulkDelete = () => {
    const updatedContacts = contacts.filter((_, i) => !selectedIndexes.includes(i));
    setContacts(updatedContacts);
    setSelectedIndexes([]);
    setMessage("✅ مخاطبین انتخاب‌شده حذف شدند.");
  };

  const filteredContacts = contacts.filter(
    c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="container">
      <h2>📇 لیست مخاطبین</h2>

      <input
        type="text"
        name="name"
        placeholder="نام و نام خانوادگی"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error-text">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="ایمیل"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error-text">{errors.email}</p>}

      <input
        type="tel"
        name="phone"
        placeholder="شماره تلفن"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <p className="error-text">{errors.phone}</p>}

      <button onClick={handleAddOrUpdate} disabled={!isFormValid}>
        {editIndex !== null ? "✏️ ویرایش مخاطب" : "➕ افزودن"}
      </button>

      <p className="message">{message}</p>

      <input
        className="search-box"
        type="text"
        placeholder="🔍 جستجو در مخاطبین..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {selectedIndexes.length > 0 && (
        <button
          style={{ backgroundColor: "#e53e3e", marginTop: "10px" }}
          onClick={handleBulkDelete}
        >
          🗑️ حذف گروهی مخاطبین
        </button>
      )}

      <ul>
        {filteredContacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <input
              type="checkbox"
              checked={selectedIndexes.includes(index)}
              onChange={() => handleSelect(index)}
              style={{ marginRight: "10px" }}
            />
            {contact.name} - {contact.email} - {contact.phone}
            <div>
              <button className="edit-button" onClick={() => handleEdit(index)}>✏️ ویرایش</button>
              <button className="delete-button" onClick={() => handleDelete(index)}>❌ حذف</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;