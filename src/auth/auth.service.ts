import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterAndLoginInput } from './dto/register.input';
import { hash, verify } from 'argon2';
import { Auth } from './entities/auth.entity';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { MyContext } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(data: RegisterAndLoginInput, ctx: MyContext): Promise<Auth> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const isValid = await verify(existingUser.password, data.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    ctx.req.session.userId = existingUser.id;
    return existingUser;
  }

  async register(data: RegisterAndLoginInput, ctx: MyContext): Promise<Auth> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hash(data.password);
    console.log(hashedPassword);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    ctx.req.session.userId = user.id;
    return user;
  }

  async me(ctx: MyContext): Promise<Auth | null> {
    if (!ctx.req.session.userId) return null;
    return this.prisma.user.findUnique({
      where: {
        id: ctx.req.session.userId,
      },
    });
  }

  async logout(ctx: MyContext): Promise<boolean> {
    if (!ctx.req.session.userId) return false;
    ctx.req.session.userId = null;
    return true;
  }
}
