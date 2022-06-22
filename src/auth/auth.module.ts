import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  providers: [AuthResolver, AuthService, PrismaService],
})
export class AuthModule {}
