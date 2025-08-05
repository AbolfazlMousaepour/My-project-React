export const saveContacts = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

export const getContacts = () => {
  const saved = localStorage.getItem("contacts");
  return saved ? JSON.parse(saved) : [];
};