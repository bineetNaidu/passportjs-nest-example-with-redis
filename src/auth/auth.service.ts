import { Injectable } from '@nestjs/common';
import { RegisterAndLoginInput } from './dto/register.input';

@Injectable()
export class AuthService {
  login(data: RegisterAndLoginInput) {
    return 'This action adds a new auth';
  }

  register(data: RegisterAndLoginInput) {
    return `This action returns all auth`;
  }
}
