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
import { UserQueryDto } from './dto/user-query.dto';

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

  async findFromFirebaseId(userId): Promise<User> {
    let query = { firebaseUserId: userId };
    let user = await this.userModel.findOne(query).exec();
    if (!user) throw new NotFoundException('User Not Found');
    else return user;
  }

  async findAllUsers(userQueryDto: UserQueryDto): Promise<User[]> {
    let query = {};
    let projection = {};
    let option = {
      skip: (userQueryDto.pageNum - 1) * userQueryDto.pageSize,
      limit: userQueryDto.pageSize,
    };

    let user = await this.userModel.find(query, projection, option).exec();
    return user;
  }

  async countAllUsers(): Promise<number> {
    return await this.userModel.count({}).exec();
  }

  async findUserById(userId: string): Promise<User> {
    const query: any = {
      _id: userId,
    };
    return await this.userModel.findOne(query);
  }

}
