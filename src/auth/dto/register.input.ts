import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterAndLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
