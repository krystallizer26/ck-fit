import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule, RuleDocument } from './schemas/rule.schema';

@Injectable()
export class RuleService {
  constructor(
    @InjectModel(Rule.name) private ruleModel: Model<RuleDocument>,
  ) {}

  async create(createRuleDto: CreateRuleDto, admin): Promise<Rule> {
    let rule: any = {
      ...createRuleDto,
      createdBy: admin,
      createDate: new Date(),
      lastUpdatedDate: new Date(),
    };

    const newRule = new this.ruleModel(rule);
    return await newRule.save();
  }

  // async getPaginate(pageSize) {
  //   let allCount = await this.ruleModel.count({});
  //   let paginate = {
  //     pageSize: pageSize,
  //     maxPage: Math.ceil(allCount / pageSize),
  //   };
  //   return paginate;
  // }

  // async findById(id: string): Promise<Rule> {
  //   let query = { _id: id };
  //   return await this.ruleModel.findOne(query);
  // }

  // async findWithPaginate(
  //   field: string,
  //   pageSize: number,
  //   pageNum: number,
  // ): Promise<Rule[]> {
  //   let query = {};

  //   let projection = {};
  //   if (field) {
  //     field.split(',').forEach((eachField) => {
  //       projection[eachField] = 1;
  //     });
  //   }

  //   let option = { skip: (pageNum - 1) * pageSize, limit: pageSize };
  //   return await this.ruleModel.find(query, projection, option);
  // }

  // async update(id: string, updateRuleDto: UpdateRuleDto) {
  //   const rule = await this.findById(id); // ใช้ Funtion ร่วมกับในตัวมันเองได้เลย, มีการ throw ได้ตามปกติ
  //   if (!rule) throw new NotFoundException('Rule Not Found');
  //   const editRule = new this.ruleModel(Object.assign(rule, updateRuleDto)); // Replace ค่า แบบเอาไปแทนที่ ถ้าเกิดมีค่านั้นๆใน updateRuleDto
  //   return await editRule.save();
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} rule`;
  // }
}
