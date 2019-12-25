import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Author, AuthorRelations, Books } from '../models';
import { MongoDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { BooksRepository } from './books.repository'

export class AuthorRepository extends DefaultCrudRepository<
  Author,
  typeof Author.prototype.name,
  AuthorRelations
  > {
  // book: any;
  // books(id: string) {
  //   throw new Error("Method not implemented.");
  // }
  public readonly books: HasManyRepositoryFactory<
    Books,
    typeof Author.prototype.name
  >;
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
    @repository.getter('BooksRepository')
    getBooksRepository: Getter<BooksRepository>,
  ) {
    super(Author, dataSource);
    this.books = this.createHasManyRepositoryFactoryFor(
      'books',
      getBooksRepository,
    );
  }
}
