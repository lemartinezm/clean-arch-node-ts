export interface Database {
  find(query: object): Promise<any[]>;
  insertOne(doc: any): Promise<any>;
  deleteOne(query: object): Promise<any>;
  update(query: object, dataToUpdate: object): Promise<any>;
}
