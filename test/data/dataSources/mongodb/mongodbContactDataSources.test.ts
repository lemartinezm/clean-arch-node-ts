import { Database } from "../../../../src/data/interfaces/dataSources/database";
import { MongoDBContactDataSource } from "../../../../src/data/dataSources/mongodb/mongodbContactDataSource";

describe("MongoDB DataSource", () => {
  let mockDatabase: Database;

  beforeAll(async () => {
    mockDatabase = {
      find: jest.fn(),
      insertOne: jest.fn(),
      deleteOne: jest.fn(),
      update: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll", async () => {
    const ds = new MongoDBContactDataSource(mockDatabase);

    jest.spyOn(mockDatabase, "find").mockImplementation(() =>
      Promise.resolve([
        {
          surname: "Smith",
          _id: "123",
          firstName: "John",
          email: "john@gmail.com",
        },
      ])
    );

    const result = await ds.getAll();
    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toStrictEqual([
      {
        surname: "Smith",
        id: "123",
        firstName: "John",
        email: "john@gmail.com",
      },
    ]);
  });

  test("create", async () => {
    const ds = new MongoDBContactDataSource(mockDatabase);
    const inputData = {
      surname: "Smith",
      email: "john@email.com",
      firstName: "John",
    };

    jest
      .spyOn(mockDatabase, "insertOne")
      .mockImplementation(() => Promise.resolve({ insertedId: "123" }));

    const result = await ds.create(inputData);
    expect(mockDatabase.insertOne).toHaveBeenCalledWith(inputData);
    expect(result).toStrictEqual(true);
  });

  test("delete", async () => {
    const ds = new MongoDBContactDataSource(mockDatabase);
    const query = {
      firstName: "Luis",
    };

    jest
      .spyOn(mockDatabase, "deleteOne")
      .mockImplementation(() => Promise.resolve(true));

    const result = await ds.delete(query);
    expect(mockDatabase.deleteOne).toHaveBeenCalledWith(query);
    expect(result).toStrictEqual(true);
  });

  test("update", async () => {
    const ds = new MongoDBContactDataSource(mockDatabase);
    const query = {
      firstName: "Luis",
    };
    const dataToUpdate = {
      firstName: "Eduardo",
      surname: "Ramirez",
    };

    jest
      .spyOn(mockDatabase, "update")
      .mockImplementation(() => Promise.resolve(true));

    const result = await ds.update(query, dataToUpdate);
    expect(mockDatabase.update).toHaveBeenCalledTimes(1);
    expect(mockDatabase.update).toHaveBeenCalledWith(query, dataToUpdate);
    expect(result).toStrictEqual(true);
  });
});
