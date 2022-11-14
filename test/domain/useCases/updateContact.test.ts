import { Contact } from "../../../src/domain/entities/contact";
import { ContactRepository } from "../../../src/domain/interfaces/repositories/contactRepository";
import { UpdateContact } from "../../../src/domain/useCases/contact/updateContact";

describe("Update contact use case", () => {
  class MockContactRepository implements ContactRepository {
    updateContact(query: object, dataToUpdate: object): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    createContact(contact: Contact): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    getContacts(): Promise<Contact[]> {
      throw new Error("Method not implemented.");
    }
    deleteContact(query: object): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockContactRepository: MockContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  it("should return true", async () => {
    const query = {
      firstName: "Luis",
    };

    const dataToUpdate = {
      firstName: "Eduardo",
      surname: "Rojas",
    };

    jest
      .spyOn(mockContactRepository, "updateContact")
      .mockImplementation(() => Promise.resolve(true));

    const updateContactUseCase = new UpdateContact(mockContactRepository);
    const result = await updateContactUseCase.execute(query, dataToUpdate);
    expect(result).toStrictEqual(true);
  });
});
