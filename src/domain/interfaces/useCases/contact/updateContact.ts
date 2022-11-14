export interface UpdateContactUseCase {
  execute(query: object, dataToUpdate: object): Promise<boolean>;
}
