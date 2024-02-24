import * as path from "path";
import { nanoid } from "nanoid";
import { writeFile, readFile } from "fs/promises";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const data = await readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);

  return result || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContactIndex = contacts.findIndex((item) => item.id === id);
  if (deletedContactIndex !== -1) {
    const [deletedContact] = contacts.splice(deletedContactIndex, 1);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  }
  return null;
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const addedContact = { id: nanoid(), name, email, phone };
  contacts.push(addedContact);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return addedContact;
};
