import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  Find(query) {
    return this.userModel.find(query).exec();
  }

  FindOne(query) {
    return this.userModel.findOne(query).exec();
  }

  async Create(data: any) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = new this.userModel(data);
    newUser.password = hash;

    const model = await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rta } = model.toJSON();

    return rta;
  }

  async Update(id: string, changes: any) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  Delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
