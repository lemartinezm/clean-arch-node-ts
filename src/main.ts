import mongoose from "mongoose";
import server from "./server";
import ContactsRouter from "./presentation/routers/contactRouter";
import { GetAllContacts } from "./domain/useCases/contact/getAllContacts";
import { CreateContact } from "./domain/useCases/contact/createContact";
import { ContactRepositoryImpl } from "./domain/repositories/contactRepository";
import { Database } from "./data/interfaces/dataSources/database";
import { MongoDBContactDataSource } from "./data/dataSources/mongodb/mongodbContactDataSource";
import { DeleteContact } from "./domain/useCases/contact/deleteContact";
import { UpdateContact } from "./domain/useCases/contact/updateContact";
import { ContactModel } from "./data/dataSources/mongodb/models/contactModel";

(async () => {
  await mongoose.connect("mongodb://localhost:27017/CONTACTS_DB");

  const contactDatabaseMongoose: Database = {
    find: async (query) => await ContactModel.find(query),
    insertOne: async (doc) => await ContactModel.create(doc),
    deleteOne: async (query) => await ContactModel.deleteOne(query),
    update: async (query, dataToUpdate) =>
      await ContactModel.updateOne(query, dataToUpdate),
  };

  const contactMiddleware = ContactsRouter(
    new GetAllContacts(
      new ContactRepositoryImpl(
        new MongoDBContactDataSource(contactDatabaseMongoose)
      )
    ),
    new CreateContact(
      new ContactRepositoryImpl(
        new MongoDBContactDataSource(contactDatabaseMongoose)
      )
    ),
    new DeleteContact(
      new ContactRepositoryImpl(
        new MongoDBContactDataSource(contactDatabaseMongoose)
      )
    ),
    new UpdateContact(
      new ContactRepositoryImpl(
        new MongoDBContactDataSource(contactDatabaseMongoose)
      )
    )
  );

  server.use("/contact", contactMiddleware);
  server.listen(4000, () => {
    console.log("Running on server");
  });
})();
