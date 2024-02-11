const fs = require("node:fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const AllContacts = await listContacts();
  const result = AllContacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const AllContacts = await listContacts();
  const index = AllContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  } else {
    [result] = AllContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(AllContacts, null, 2));

    return result;
  }
}

async function addContact(objData) {
  const AllContacts = await listContacts();
  const newContact = { id: nanoid(), ...objData };
  AllContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(AllContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
