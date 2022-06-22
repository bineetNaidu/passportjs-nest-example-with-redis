import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RegisterAndLoginInput } from './dto/register.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  login(@Args('data') data: RegisterAndLoginInput): Promise<Auth> {
    return this.authService.login(data);
  }

  @Mutation(() => Auth)
  register(@Args('data') data: RegisterAndLoginInput): Promise<Auth> {
    return this.authService.register(data);
  }

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}
