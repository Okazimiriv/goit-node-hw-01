const fs = require("fs/promises"); // const fs = require("fs").promises; идентично
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

//  Повертає масив контактів.
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  // console.log(contacts);
  return JSON.parse(contacts);
};

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

// Повертає об'єкт доданого контакту.
const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
