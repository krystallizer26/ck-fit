import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExtractUser } from '../auth/extract-user.decorator';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { isValidObjectId } from 'mongoose';
import { MongoIdParam } from '../mongodb/mongodb-id.dto';
import { FindVideoDto } from './dto/find-video.dto';
import { ValidateMongoId } from '../_common/validator/mongoid-validator';
import { calculatePagination } from '../_common/services/pagination';

@ApiTags('video (จัดการคลิปวิดิโอบนระบบ)')
@ApiBearerAuth('admin-token')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth('admin-token')
  @ApiOperation({
    description: `API สำหรับสร้าง Video ใหม่ สำหรับใช้เพิ่มใน Rule ต่อไป`,
    summary: 'สร้าง Video ใหม่',
  })
  @Post()
  async create(@Body() createVideoDto: CreateVideoDto, @ExtractUser() admin) {
    let response = { statusCode: 201, message: 'OK', data: null };

    response.data = {};
    response.data['video'] = await this.videoService.create(
      createVideoDto,
      admin,
    );
    return response;
  }

  @Get(':videoId')
  @ApiOperation({
    description: `API สำหรับดึง Video ที่ต้องการผ่านทาง id เพื่อดูข้อมูลเป็นรายอันได้`,
    summary: 'ดึง Video ตาม id',
  })
  async findOne(@Param('videoId', ValidateMongoId) videoId: string) {
    let response = { statusCode: 200, message: 'OK', data: null };

    response.data = {};
    let video = await this.videoService.findById(videoId);
    if (!video) throw new NotFoundException('Video Not Found');
    response.data['video'] = video;
    return response;
  }

  @Get()
  @ApiOperation({
    description: `API สำหรับดึง Video ทั้งหมด โดยมีการแบ่งหน้า และสามารถเลือก Field ที่ต้องการให้คืนไปให้ได้`,
    summary: 'ดึง Video แบบ Paginate',
  })
  async find(@Query() findVideoDto: FindVideoDto) {
    let response = { statusCode: 200, message: 'OK', data: null };

    response.data = {};

    response.data['paginate'] = await calculatePagination(
      findVideoDto.pageNum,
      findVideoDto.pageSize,
      await this.videoService.countAllVideo(),
    );

    response.data['videos'] = await this.videoService.findWithPaginate(
      findVideoDto.field,
      findVideoDto.pageSize,
      findVideoDto.pageNum,
      findVideoDto.idKeySearch,
      findVideoDto.videoKeySearch,
      findVideoDto.publicSearch,
      findVideoDto.focusedSearch,
      findVideoDto.timeSort,
      findVideoDto.burnSort,
      findVideoDto.equipmentSearch,
    );
    return response;
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth('admin-token')
  @Patch(':videoId')
  @ApiOperation({
    description: `API สำหรับแก้ไข Video 1 อัน ตาม id ที่ต้องการ สามารถส่งมาแค่ Field ที่จะแก้ไขได้ Field ฟไหนไม่ได้ส่งมา ก็จะคงค่าไว้ที่เดิม`,
    summary: 'แก้ไข Video ตาม id',
  })
  async update(
    @Param('videoId', ValidateMongoId) videoId: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    let response = { statusCode: 200, message: 'OK', data: null };

    response.data = {};
    response.data['video'] = await this.videoService.update(
      videoId,
      updateVideoDto,
    );
    return response;
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth('admin-token')
  @Delete(':videoId')
  @ApiOperation({
    description: `API สำหรับลบ Video 1 อัน ตาม id ที่ต้องการ`,
    summary: 'ลบ Video ตาม id',
  })
  async remove(@Param('videoId', ValidateMongoId) videoId: string) {
    let response = { statusCode: 200, message: 'OK', data: null };

    response.data = {};
    response.data['video'] = await this.videoService.delete(videoId);
    return response;
  }
}
