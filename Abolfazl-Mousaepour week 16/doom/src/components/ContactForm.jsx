import { useContext } from "react";
import ContactContext from "../context/ContactContext";

const ContactForm = () => {
  const {
    formData,
    errors,
    handleChange,
    handleAddOrUpdate,
    editIndex
  } = useContext(ContactContext);

  return (
    <>
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

      <button onClick={handleAddOrUpdate} disabled={
        !formData.name || !formData.email || !formData.phone
      }>
        {editIndex !== null ? "✏️ ویرایش مخاطب" : "➕ افزودن"}
      </button>
    </>
  );
};

export default ContactForm;