import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  async registerToSystem(createUserDto: CreateUserDto, userId): Promise<any> {
    createUserDto.firebaseUserId = userId;
    createUserDto.createDate = new Date();
    const newUser = await this.userModel.findOneAndUpdate(
      { firebaseUserId: userId },
      createUserDto,
      {
        upsert: true,
        new: true,
      },
    );
    return newUser;
  }

  async findFromToken(userId): Promise<User> {
    let query = { firebaseUserId: userId };
    let user = await this.userModel.findOne(query).exec();
    if (!user) throw new NotFoundException('User Not Found');
    else return user;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
