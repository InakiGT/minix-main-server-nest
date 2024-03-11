import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users/users.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(email: string, password: string) {
    const user = await this.usersService.FindOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(user.password, password);

      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rta } = user;

        return rta;
      }
    }

    return null;
  }

  GenerateJwt(user: User) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
