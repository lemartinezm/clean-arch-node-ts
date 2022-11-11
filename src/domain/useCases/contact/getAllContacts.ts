import { Contact } from "../../entities/contact";
import { ContactRepository } from "../../interfaces/repositories/contactRepository";
import { GetAllContactsUseCase } from "../../interfaces/useCases/contact/getAllContacts";

export class GetAllContacts implements GetAllContactsUseCase {
  contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(): Promise<Contact[]> {
    const result = await this.contactRepository.getContacts();
    return result;
  }
}
