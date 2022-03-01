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
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExtractUser } from '../auth/extract-user.decorator';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { isValidObjectId } from 'mongoose';
import { MongoIdParam } from '../mongodb/mongodb-id.dto';
import { FindRuleDto } from './dto/find-rule.dto';

@ApiTags('rule (จัดการการรวมคลิปวิดิโอออกมาเป็นกฎการแนะนำคลิปบนระบบ)')
@ApiBearerAuth('admin-token')
@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth('admin-token')
  @ApiOperation({
    description: `API สำหรับสร้าง Rule ใหม่ พร้อมกับเงื่อนไขในการแนะนำ Rule และวิดิโอที่จะอยู่ใต้ Rule ดังกล่าว`,
    summary: 'สร้าง Rule ใหม่',
  })
  @Post()
  async create(@Body() createRuleDto: any, @ExtractUser() admin) {
    let response = { statusCode: 201, message: 'OK', data: null };

    response.data = {};
    response.data['rule'] = await this.ruleService.create(
      createRuleDto,
      admin,
    );
    return response;
  }

  // @Get(':id')
  // @ApiOperation({
  //   description: `API สำหรับดึง Rule ที่ต้องการผ่านทาง id เพื่อดูข้อมูลเป็นรายอันได้`,
  //   summary: 'ดึง Rule ตาม id',
  // })
  // async findOne(@Param() mongoIdParam: MongoIdParam) {
  //   let response = { statusCode: 200, message: 'OK', data: null };

  //   response.data = {};
  //   let rule = await this.ruleService.findById(mongoIdParam.id);
  //   if (!rule) throw new NotFoundException('Rule Not Found');
  //   response.data['rule'] = rule;
  //   return response;
  // }

  // @Get()
  // @ApiOperation({
  //   description: `API สำหรับดึง Rule ทั้งหมด โดยมีการแบ่งหน้า และสามารถเลือก Field ที่ต้องการให้คืนไปให้ได้`,
  //   summary: 'ดึง Rule แบบ Paginate',
  // })
  // async find(@Query() findRuleDto: FindRuleDto) {
  //   let response = { statusCode: 200, message: 'OK', data: null };

  //   response.data = {};
  //   let paginate: any = await this.ruleService.getPaginate(
  //     findRuleDto.pageSize,
  //   );
  //   paginate = { ...paginate, pageNum: findRuleDto.pageNum };
  //   response.data['paginate'] = paginate;

  //   let rules = await this.ruleService.findWithPaginate(
  //     findRuleDto.field,
  //     findRuleDto.pageSize,
  //     findRuleDto.pageNum,
  //   );
  //   response.data['rules'] = rules;
  //   return response;
  // }

  // @UseGuards(AdminAuthGuard)
  // @ApiBearerAuth('admin-token')
  // @Patch(':id')
  // @ApiOperation({
  //   description: `API สำหรับแก้ไข Rule 1 อัน ตาม id ที่ต้องการ สามารถส่งมาแค่ Field ที่จะแก้ไขได้ Field ฟไหนไม่ได้ส่งมา ก็จะคงค่าไว้ที่เดิม`,
  //   summary: 'แก้ไข Rule ตาม id',
  // })
  // async update(
  //   @Param() mongoIdParam: MongoIdParam,
  //   @Body() updateRuleDto: UpdateRuleDto,
  // ) {
  //   let response = { statusCode: 200, message: 'OK', data: null };

  //   response.data = {};
  //   response.data['rule'] = await this.ruleService.update(
  //     mongoIdParam.id,
  //     updateRuleDto,
  //   );
  //   return response;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ruleService.remove(+id);
  // }
}
