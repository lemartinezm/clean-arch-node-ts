import server from "./server";
import ContactsRouter from "./presentation/routers/contactRouter";
import { GetAllContacts } from "./domain/useCases/contact/getAllContacts";
import { CreateContact } from "./domain/useCases/contact/createContact";
import { ContactRepositoryImpl } from "./domain/repositories/contactRepository";
import { MongoClient } from "mongodb";
import { Database } from "./data/interfaces/dataSources/database";
import { MongoDBContactDataSource } from "./data/dataSources/mongodb/mongodbContactDataSource";
import { DeleteContact } from "./domain/useCases/contact/deleteContact";

(async () => {
  const client: MongoClient = new MongoClient(
    "mongodb://localhost:27017/contacts"
  );
  await client.connect();
  const db = client.db("CONTACTS_DB");

  const contactDatabase: Database = {
    find: (query) => db.collection("contacts").find(query).toArray(),
    insertOne: (doc) => db.collection("contacts").insertOne(doc),
    deleteOne: (query) => db.collection("contacts").deleteOne(query),
  };

  const contactMiddleware = ContactsRouter(
    new GetAllContacts(
      new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))
    ),
    new CreateContact(
      new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))
    ),
    new DeleteContact(
      new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))
    )
  );

  server.use("/contact", contactMiddleware);
  server.listen(4000, () => {
    console.log("Running on server");
  });
})();
