import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RegisterAndLoginInput } from './dto/register.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(@Args('data') data: RegisterAndLoginInput) {
    return this.authService.login(data);
  }

  @Mutation(() => String)
  updateAuth(@Args('data') data: RegisterAndLoginInput) {
    return this.authService.register(data);
  }

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}
