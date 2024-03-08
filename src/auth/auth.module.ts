import { Module } from '@nestjs/common';
import { AuthService } from './serivces/auth.service';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService],
})
export class AuthModule {}
