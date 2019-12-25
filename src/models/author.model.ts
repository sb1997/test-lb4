import { Entity, model, property, hasMany } from '@loopback/repository';
import { Books } from './books.model';

@model()
export class Author extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  dob: string;

  @property({
    type: 'string',
    required: true,
  })
  qualification: string;

  @property({
    type: 'string',
    required: true,
  })
  mail: string;

  @hasMany(() => Books, { keyTo: 'name' })
  name_book: Books[];

  constructor(data?: Partial<Author>) {
    super(data);
  }
}

export interface AuthorRelations {
  // describe navigational properties here
}

export type AuthorWithRelations = Author & AuthorRelations;
