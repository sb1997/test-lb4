import { DefaultCrudRepository } from '@loopback/repository';
import { Books, BooksRelations } from '../models';
import { MongoDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class BooksRepository extends DefaultCrudRepository<
  Books,
  typeof Books.prototype.name,
  BooksRelations
  > {
  author: any;
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Books, dataSource);
  }
}
