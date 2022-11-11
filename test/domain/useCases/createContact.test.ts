import { Contact } from "../../../src/domain/entities/contact";
import { ContactRepository } from "../../../src/domain/interfaces/repositories/contactRepository";
import { CreateContact } from "../../../src/domain/useCases/contact/createContact";

describe("Get all contacts use case", () => {
  class MockContactRepository implements ContactRepository {
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
    const InputData = {
      id: "1",
      surname: "Smith",
      firstName: "John",
      email: "john@email.com",
    };

    jest
      .spyOn(mockContactRepository, "createContact")
      .mockImplementation(() => Promise.resolve(true));

    const createContactUseCase = new CreateContact(mockContactRepository);
    const result = await createContactUseCase.execute(InputData);
    expect(result).toBe(true);
  });
});
