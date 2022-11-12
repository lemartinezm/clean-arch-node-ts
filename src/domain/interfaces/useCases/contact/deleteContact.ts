export interface DeleteContactUseCase {
  execute(query: object): Promise<boolean>;
}
