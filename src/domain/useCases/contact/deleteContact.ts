import { ContactRepository } from "../../interfaces/repositories/contactRepository";
import { DeleteContactUseCase } from "../../interfaces/useCases/contact/deleteContact";

export class DeleteContact implements DeleteContactUseCase {
  contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(query: object): Promise<boolean> {
    const result = await this.contactRepository.deleteContact(query);
    return result;
  }
}
