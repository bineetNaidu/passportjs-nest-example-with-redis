import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RegisterAndLoginInput } from './dto/register.input';
import { MyContext } from 'src/utils/types';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  login(
    @Args('data') data: RegisterAndLoginInput,
    @Context() ctx: MyContext,
  ): Promise<Auth> {
    return this.authService.login(data, ctx);
  }

  @Mutation(() => Auth)
  register(
    @Context() ctx: MyContext,
    @Args('data') data: RegisterAndLoginInput,
  ): Promise<Auth> {
    return this.authService.register(data, ctx);
  }

  @Query(() => Auth, { nullable: true })
  me(@Context() ctx: MyContext): Promise<Auth | null> {
    return this.authService.me(ctx);
  }

  @Mutation(() => Boolean)
  logout(@Context() ctx: MyContext): Promise<boolean> {
    return this.authService.logout(ctx);
  }
}
