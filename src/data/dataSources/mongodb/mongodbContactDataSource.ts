import { Contact } from "../../../domain/entities/contact";
import { ContactDataSource } from "../../interfaces/dataSources/contactDataSource";
import { Database } from "../../interfaces/dataSources/database";

export class MongoDBContactDataSource implements ContactDataSource {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async create(contact: Contact): Promise<boolean> {
    const result = await this.database.insertOne(contact);
    return result !== null;
  }

  async getAll(): Promise<Contact[]> {
    const result = await this.database.find({});
    return result.map((item) => ({
      id: item._id.toString(),
      surname: item.surname,
      firstName: item.firstName,
      email: item.email,
    }));
  }

  async delete(query: object) {
    const result = await this.database.deleteOne(query);
    return result;
  }

  async update(query: object, dataToUpdate: object): Promise<boolean> {
    const result = await this.database.update(query, {$set: dataToUpdate});
    return result;
  }
}
