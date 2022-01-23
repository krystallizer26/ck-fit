import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    let admin: Admin = {
      ...createAdminDto,
      createDate: new Date(),
    };
    let newAdmin = new this.adminModel(admin);
    return await newAdmin.save();
  }

  async getAdminByUsername(username: string): Promise<Admin> {
    const query: any = {
      username: username,
    };
    return await this.adminModel.findOne(query);
  }

  async generateAdminJWT(admin: Admin, inputPassword: string): Promise<string> {
    await admin.checkPassword(inputPassword);
    const { password, ...tokenData } = admin;
    return this.jwtService.sign(tokenData, { secret: process.env.SECRET });
  }
}
