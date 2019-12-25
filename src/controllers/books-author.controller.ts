import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Books,
  Author,
} from '../models';
import { BooksRepository } from '../repositories';

export class BooksAuthorController {
  constructor(
    @repository(BooksRepository)
    public booksRepository: BooksRepository,
  ) { }

  @get('/books/{id}/author', {
    responses: {
      '200': {
        description: 'Author belonging to Books',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Author) },
          },
        },
      },
    },
  })
  async getAuthor(
    @param.path.string('id') id: typeof Books.prototype.name,
  ): Promise<Author> {
    return this.booksRepository.author(id);
  }
}

