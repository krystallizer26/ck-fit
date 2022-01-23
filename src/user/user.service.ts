import { Model } from 'mongoose';
import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto, userId): Promise<User> {
    createUserDto.firebaseUserId = userId;
    createUserDto.createDate = new Date();
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findFromToken(userId): Promise<User> {
    let query = { firebaseUserId: userId };
    let user = await this.userModel.findOne(query).exec()
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
