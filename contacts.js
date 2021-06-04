const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  // node index.js --action list
  try {
    const dataContacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

    return console.table(dataContacts);
  } catch (error) {
    error.message = "listContacts error";
    throw error;
  }
}

async function getContactById(contactId) {
  // node index.js --action get --id 5
  try {
    const dataContacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const requiredContact = dataContacts.find(
      (contact) => String(contact.id) === contactId
    );

    return console.table(requiredContact);
  } catch (error) {
    error.message = "getContactById error";
    throw error;
  }
}

async function removeContact(contactId) {
  // node index.js --action remove --id 3
  try {
    const dataContacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newDataContacts = dataContacts.filter(
      (contact) => String(contact.id) !== contactId
    );
    const stringContacts = JSON.stringify(newDataContacts);
    fs.writeFile(contactsPath, stringContacts);

    return console.log(`Contact with ID: ${contactId} is deleted!`);
  } catch (error) {
    error.message = "removeContact error";
    throw error;
  }
}

async function addContact(name, email, phone) {
  // node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
  try {
    const dataContacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newContact = { name, email, phone, id: v4() };
    const updatedContacts = [...dataContacts, newContact];
    const newListContacts = JSON.stringify(updatedContacts);
    await fs.writeFile(contactsPath, newListContacts);

    return console.log(`New contact ${name} added!`);
  } catch (error) {
    error.message = "addContact error";
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
