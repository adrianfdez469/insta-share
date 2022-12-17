import { File } from "../graphql";

export class FilesService {

  async findAll(params): Promise<File[]> {
    const { authorId } = params;
    return [
      {
        id: '123',
        name: 'Dog file',
        size: 32,
        status: 'saved',
        url: 'http://www.google/com'
      }
    ]
  }
}