import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
