import * as session from 'express-session';
import { MiddlewareConsumer, Module, NestModule, Inject } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from '../auth/auth.module';
import * as RedisStore from 'connect-redis';
import { REDIS } from '../redis/redis.constant';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    RedisModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ res, req }),
    }),
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisStore.Client) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.SESSION_SECRET,
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          resave: false,
          saveUninitialized: false,
          name: 'passportjs_nest_example_with_redis_cookie',
          cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
          },
        }),
      )
      .forRoutes('/graphql');
  }
}
