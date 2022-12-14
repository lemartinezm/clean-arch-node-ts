import { Router, Request, Response } from "express";
import { CreateContactUseCase } from "../../domain/interfaces/useCases/contact/createContact";
import { DeleteContactUseCase } from "../../domain/interfaces/useCases/contact/deleteContact";
import { GetAllContactsUseCase } from "../../domain/interfaces/useCases/contact/getAllContacts";
import { UpdateContactUseCase } from "../../domain/interfaces/useCases/contact/updateContact";

export default function ContactsRouter(
  getAllContactsUseCase: GetAllContactsUseCase,
  createContactUseCase: CreateContactUseCase,
  deleteContactUseCase: DeleteContactUseCase,
  updateContactUseCase: UpdateContactUseCase
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

  router.put("/", async (req: Request, res: Response) => {
    try {
      await updateContactUseCase.execute(req.body.query, req.body.dataToUpdate);
      res.status(200).send({ message: "Contact updated successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error updating data" });
    }
  });

  return router;
}
