import { Contact } from "../../../src/domain/entities/contact";
import { ContactRepository } from "../../../src/domain/interfaces/repositories/contactRepository";
import { DeleteContact } from "../../../src/domain/useCases/contact/deleteContact";

describe("Delete contact use case", () => {
  class MockContactRepository implements ContactRepository {
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

  let mockContactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  it("should return true", async () => {
    const query = {
      firstName: "Luis",
    };

    jest
      .spyOn(mockContactRepository, "deleteContact")
      .mockImplementation(() => Promise.resolve(true));

    const deleteContactUseCase = new DeleteContact(mockContactRepository);
    const result = await deleteContactUseCase.execute(query);
    expect(result).toBe(true);
  });
});
