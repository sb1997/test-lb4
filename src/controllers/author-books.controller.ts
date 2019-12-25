import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Author,
  Books,
} from '../models';
import { AuthorRepository } from '../repositories';

export class AuthorBooksController {
  constructor(
    @repository(AuthorRepository) protected authorRepository: AuthorRepository,
  ) { }

  @get('/authors/{id}/books', {
    responses: {
      '200': {
        description: 'Array of Books\'s belonging to Author',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Books) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Books>,
  ): Promise<Books[]> {
    return this.authorRepository.books(id).find(filter);
  }

  @post('/authors/{id}/books', {
    responses: {
      '200': {
        description: 'Author model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Books) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Author.prototype.name,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Books, {
            title: 'NewBooksInAuthor',
            exclude: ['name'],
            optional: ['name']
          }),
        },
      },
    }) books: Omit<Books, 'name'>,
  ): Promise<Books> {
    return this.authorRepository.books(id).create(books);
  }

  @patch('/authors/{id}/books', {
    responses: {
      '200': {
        description: 'Author.Books PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Books, { partial: true }),
        },
      },
    })
    books: Partial<Books>,
    @param.query.object('where', getWhereSchemaFor(Books)) where?: Where<Books>,
  ): Promise<Count> {
    return this.authorRepository.books(id).patch(books, where);
  }

  @del('/authors/{id}/books', {
    responses: {
      '200': {
        description: 'Author.Books DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Books)) where?: Where<Books>,
  ): Promise<Count> {
    return this.authorRepository.books(id).delete(where);
  }
}
