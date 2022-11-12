import { Router, Request, Response } from "express";
import { CreateContactUseCase } from "../../domain/interfaces/useCases/contact/createContact";
import { DeleteContactUseCase } from "../../domain/interfaces/useCases/contact/deleteContact";
import { GetAllContactsUseCase } from "../../domain/interfaces/useCases/contact/getAllContacts";

export default function ContactsRouter(
  getAllContactsUseCase: GetAllContactsUseCase,
  createContactUseCase: CreateContactUseCase,
  deleteContactUseCase: DeleteContactUseCase
) {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const contacts = await getAllContactsUseCase.execute();
      res.send(contacts);
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      await createContactUseCase.execute(req.body);
      res.status(201).send({ message: "Created" });
    } catch (err) {
      res.status(500).send({ message: "Error saving data" });
    }
  });

  router.delete("/", async (req: Request, res: Response) => {
    try {
      await deleteContactUseCase.execute(req.body);
      res.status(204).send({});
    } catch (err) {
      res.status(500).send({ message: "Error deleting data" });
    }
  });

  return router;
}
