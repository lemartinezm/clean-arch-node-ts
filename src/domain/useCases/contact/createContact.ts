import { Contact } from "../../entities/contact";
import { ContactRepository } from "../../interfaces/repositories/contactRepository";
import { CreateContactUseCase } from "../../interfaces/useCases/contact/createContact";

export class CreateContact implements CreateContactUseCase {
  contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(contact: Contact): Promise<boolean> {
    const result = await this.contactRepository.createContact(contact);
    return result;
  }
}
