import request from "supertest";
import { Contact } from "../../../src/domain/entities/contact";
import { CreateContactUseCase } from "../../../src/domain/interfaces/useCases/contact/createContact";
import { DeleteContactUseCase } from "../../../src/domain/interfaces/useCases/contact/deleteContact";
import { GetAllContactsUseCase } from "../../../src/domain/interfaces/useCases/contact/getAllContacts";
import ContactRouter from "../../../src/presentation/routers/contactRouter";
import server from "../../../src/server";

class MockGetAllContactsUseCase implements GetAllContactsUseCase {
  execute(): Promise<Contact[]> {
    throw new Error("Method not implemented.");
  }
}

class MockCreateContactUseCase implements CreateContactUseCase {
  execute(contact: Contact): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockDeleteContactUseCase implements DeleteContactUseCase {
  execute(query: object): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("Contact Router", () => {
  let mockCreateContactUseCase: CreateContactUseCase;
  let mockGetAllContactsUseCase: GetAllContactsUseCase;
  let mockDeleteContactUseCase: DeleteContactUseCase;

  beforeAll(() => {
    mockGetAllContactsUseCase = new MockGetAllContactsUseCase();
    mockCreateContactUseCase = new MockCreateContactUseCase();
    mockDeleteContactUseCase = new MockDeleteContactUseCase();

    server.use(
      "/contact",
      ContactRouter(
        mockGetAllContactsUseCase,
        mockCreateContactUseCase,
        mockDeleteContactUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /contact", () => {
    it("should return 200 with data", async () => {
      const ExpectedData = [
        {
          id: "1",
          surname: "Smith",
          firstName: "John",
          email: "john@gmail.com",
        },
      ];

      jest
        .spyOn(mockGetAllContactsUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedData));

      const response = await request(server).get("/contact");

      expect(response.status).toBe(200);
      expect(mockGetAllContactsUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    it("should return 500 on use case error", async () => {
      jest
        .spyOn(mockGetAllContactsUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/contact");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error fetching data" });
    });
  });

  describe("POST /contact", () => {
    const InputData = {
      id: "1",
      surname: "Smith",
      firstName: "John",
      email: "john@gmail.com",
    };

    it("should return 201 with true", async () => {
      jest
        .spyOn(mockCreateContactUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).post("/contact").send(InputData);
      expect(response.status).toBe(201);
    });

    it("should return 500 with use case error", async () => {
      jest
        .spyOn(mockCreateContactUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post("/contact").send(InputData);
      expect(response.status).toBe(500);
    });
  });

  describe("DELETE /contact", () => {
    const query = {
      firstName: "Luis",
    };

    it("should return 204 status", async () => {
      jest
        .spyOn(mockDeleteContactUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).delete("/contact").send(query);
      expect(response.status).toBe(204);
    });

    it("should return 500 to use case error", async () => {
      jest
        .spyOn(mockDeleteContactUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).delete("/contact").send(query);
      expect(response.status).toBe(500);
    });
  });
});
