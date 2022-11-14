import { ContactRepository } from "../../interfaces/repositories/contactRepository";
import { UpdateContactUseCase } from "../../interfaces/useCases/contact/updateContact";

export class UpdateContact implements UpdateContactUseCase {
  contactRepository: ContactRepository;

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(query: object, dataToUpdate: object): Promise<boolean> {
    const result = await this.contactRepository.updateContact(
      query,
      dataToUpdate
    );
    return result;
  }
}
