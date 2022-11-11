import { Contact } from "../../../src/domain/entities/contact";
import { ContactDataSource } from "../../../src/data/interfaces/dataSources/contactDataSource";
import { ContactRepository } from "../../../src/domain/interfaces/repositories/contactRepository";
import { ContactRepositoryImpl } from "../../../src/domain/repositories/contactRepository";

class MockContactDataSource implements ContactDataSource {
  create(contact: Contact): Promise<boolean> {
    throw new Error("Method not implemented");
  }
  getAll(): Promise<Contact[]> {
    throw new Error("Method not implemented");
  }
}

describe("Contact Repository", () => {
  let mockContactDataSource: ContactDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactDataSource = new MockContactDataSource();
  });

  test("getAllContacts should return data", async () => {
    const ExpectedData = [
      { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" },
    ];

    jest
      .spyOn(mockContactDataSource, "getAll")
      .mockImplementation(() => Promise.resolve(ExpectedData));

    const contactRepository = new ContactRepositoryImpl(mockContactDataSource);
    const result = await contactRepository.getContacts();
    expect(result).toBe(ExpectedData);
  });

  test("createContact should return true", async () => {
    const InputData = {
      id: "1",
      surname: "Smith",
      firstName: "John",
      email: "john@gmail.com",
    };

    jest
      .spyOn(mockContactDataSource, "create")
      .mockImplementation(() => Promise.resolve(true));

    const contactRepository = new ContactRepositoryImpl(mockContactDataSource);
    const result = await contactRepository.createContact(InputData);
    expect(result).toBe(true);
  });
});
