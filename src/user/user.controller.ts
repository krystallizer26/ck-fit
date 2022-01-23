import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExtractUser } from '../auth/extract-user.decorator';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@ApiTags('user (จัดการสมาชิกที่ใช้งานในระบบ)')
@ApiBearerAuth('firebase-token')
@UseGuards(FirebaseAuthGuard)
@Controller('/api/user')
export class UserController {
  private logger = new Logger('userController', { timestamp: true });

  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    description:
      'API สำหรับรับข้อมูลของ User มาพร้อมกับ Token ที่ได้จากการ Authenticated ผ่าน Firebase และเชื่อมกันกับข้อมูลอื่นๆที่ได้ส่งมาพร้อมกัน',
    summary: 'สมัครใช้ระบบ ด้วย Token จาก Firebase',
  })
  async create(@Body() createUserDto: CreateUserDto, @ExtractUser() user) {
    let response = {statusCode: 201, message: "OK", data : null}
    
    response.data = {}
    response.data["user"] = this.userService.create(createUserDto, user.user_id);
    return response
  }

  @Get()
  @ApiOperation({
    description:
      'API สำหรับดูข่อมูลของ User จาก Token ที่ได้จากการ Authenticated ผ่าน Firebase',
    summary: 'ดูข้อมูลของ User ด้วย Token จาก Firebase',
  })
  async findFromToken(@ExtractUser() user) {
    let response = {statusCode: 200, message: "OK", data : null }

    response.data = {}
    response.data["user"] = await this.userService.findFromToken(user.user_id) // ใช้ user_id เมื่อเป็น user จาก firebase
    return response;
  }


}
