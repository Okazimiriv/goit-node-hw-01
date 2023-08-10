console.log("Hello. Let's start!");

const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
      // ... id
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);

    case "add":
      // ... name email phone
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log("newContact: ", newContact);

    case "remove":
      // ... id
      const removedContact = await contacts.removeContact(id);
      return console.log("removedContact: ", removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
