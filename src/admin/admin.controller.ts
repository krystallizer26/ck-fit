import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExtractUser } from '../auth/extract-user.decorator';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { UserService } from '../user/user.service';
import { ValidateMongoId } from '../_common/validator/mongoid-validator';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@ApiTags('admin (จัดการผู้ดูแลระบบ)')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({
    description: `API สำหรับสร้าง Admin คนใหม่ เพื่อใช้เข้าควบคุมระบบ เช่น จัดการกฎ / เพิ่มวิดิโอ / ...`,
    summary: 'สร้าง Admin',
  })
  async create(@Body() createAdminDto: CreateAdminDto) {
    let response = { statusCode: 201, message: 'OK', data: null };

    response.data = {};
    response.data['admin'] = await this.adminService.createAdmin(
      createAdminDto,
    );
    return response;
  }

  @Post('/login')
  async login(@Body() adminLoginDto: AdminLoginDto) {
    let response = { statusCode: 201, message: 'OK', data: null };

    let admin = await this.adminService.getAdminByEmail(adminLoginDto.email);

    response.data = {};
    if (!admin) throw new NotFoundException('Credentials not found');
    response.data['token'] = await this.adminService.generateAdminJWT(
      admin,
      adminLoginDto.password,
    );
    return response;
  }

  @UseGuards(AdminAuthGuard) // สำหรับทำงาน JWT
  @ApiBearerAuth('admin-token') // สำหรับ Swagger Doc
  @Get('/testLogin')
  async testLogin(@ExtractUser() admin) {
    let response = { statusCode: 200, message: 'OK', data: null };
    console.log(admin._id); // ใช้ _id เมื่อเป็น user จาก mongodb
    return response;
  }

}
