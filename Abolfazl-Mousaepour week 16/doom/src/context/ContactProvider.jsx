import { useState, useEffect } from "react";
import ContactContext from "./ContactContext";
import axios from "axios";

const API = "http://localhost:3001/contacts";

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API);
      const data = res.data;
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.warn("📛 دیتای دریافتی آرایه نیست:", data);
        setContacts([]);
      }
    } catch (err) {
      console.error("❌ خطا در دریافت مخاطبین:", err);
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

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
    setFormData(prev => ({ ...prev, [name]: value }));

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

  const handleAddOrUpdate = async () => {
    if (!isFormValid) {
      setMessage("⚠️ لطفاً اطلاعات معتبر وارد کنید.");
      return;
    }

    try {
      if (editIndex !== null) {
        const contactId = contacts[editIndex]?.id;
        if (!contactId) {
          setMessage("❌ مخاطب مورد نظر پیدا نشد.");
          return;
        }
        await axios.put(`${API}/${contactId}`, formData);
        setMessage("✏️ مخاطب با موفقیت ویرایش شد.");
      } else {
        await axios.post(API, formData);
        setMessage("✅ مخاطب با موفقیت افزوده شد!");
      }

      await fetchContacts(); 
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
      setEditIndex(null);
    } catch (error) {
      console.error("❌ خطا در افزودن/ویرایش مخاطب:", error);
      setMessage("مشکلی در ذخیره مخاطب به وجود آمد.");
    }
  };

  const handleDelete = async index => {
    const contactId = contacts[index]?.id;
    if (!contactId) {
      setMessage("❌ مخاطب مورد نظر برای حذف یافت نشد.");
      return;
    }
    try {
      await axios.delete(`${API}/${contactId}`);
      await fetchContacts(); 
      setMessage("🗑️ مخاطب حذف شد.");
      if (editIndex === index) {
        setFormData({ name: "", email: "", phone: "" });
        setEditIndex(null);
      }
    } catch (error) {
      console.error("❌ خطا در حذف مخاطب:", error);
      setMessage("خطا در حذف مخاطب!");
    }
  };

  const handleEdit = index => {
    const target = contacts[index];
    if (!target) {
      setMessage("❌ مخاطب برای ویرایش یافت نشد.");
      return;
    }
    setFormData(target);
    setEditIndex(index);
    setMessage("🔧 در حال ویرایش مخاطب هستید.");
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        formData,
        errors,
        searchTerm,
        message,
        editIndex,
        handleChange,
        handleAddOrUpdate,
        handleDelete,
        handleEdit,
        setSearchTerm,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;