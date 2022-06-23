import { Module } from '@nestjs/common';
import { createClient } from 'redis';

import { REDIS } from './redis.constant';

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: createClient({ legacyMode: true }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
