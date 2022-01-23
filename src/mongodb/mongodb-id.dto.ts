import { IsMongoId } from 'class-validator';

export class MongoIdParam {
  @IsMongoId()
  id: string;
}
