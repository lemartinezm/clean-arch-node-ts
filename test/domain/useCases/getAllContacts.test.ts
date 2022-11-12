import { Contact } from "../../../src/domain/entities/contact";
import { ContactRepository } from "../../../src/domain/interfaces/repositories/contactRepository";
import { GetAllContacts } from "../../../src/domain/useCases/contact/getAllContacts";

describe("Get all contacts use case", () => {
  class MockContactRepository implements ContactRepository {
    deleteContact(query: object): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    createContact(contact: Contact): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    getContacts(): Promise<Contact[]> {
      throw new Error("Method not implemented");
    }
  }

  let mockContactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  it("should return data", async () => {
    const ExpectedResult = [
      { id: "1", surname: "Smith", firstName: "John", email: "john@email.com" },
    ];

    jest
      .spyOn(mockContactRepository, "getContacts")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const getAllContactsUse = new GetAllContacts(mockContactRepository);
    const result = await getAllContactsUse.execute();
    expect(result).toStrictEqual(ExpectedResult);
  });
});
