import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;
}
