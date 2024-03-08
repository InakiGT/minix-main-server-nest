import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async Create(data: any) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = new this.userModel(data);
    newUser.password = hash;

    const model = await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rta } = model.toJSON();

    return rta;
  }
}
