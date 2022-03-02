import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule, RuleDocument } from './schemas/rule.schema';

@Injectable()
export class RuleService {
  constructor(@InjectModel(Rule.name) private ruleModel: Model<RuleDocument>) {}

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

  async countAllRule() {
    return await this.ruleModel.count({});
  }

  async findById(id: string): Promise<Rule> {
    let query = { _id: id };
    return await this.ruleModel.findOne(query).populate('activity.video');
  }

  async findWithPaginate(
    field: string,
    pageSize: number,
    pageNum: number,
    idKeySearch,
    ruleKeySearch,
    descriptionKeySearch,
    genderSearch,
    fitLev,
    lastUpdateSort,
  ): Promise<Rule[]> {
    let queryList = [];

    if (idKeySearch) queryList.push({ _id: idKeySearch });
    if (ruleKeySearch) queryList.push({ ruleName: { $regex: ruleKeySearch } });
    if (descriptionKeySearch)
      queryList.push({ description: { $regex: ruleKeySearch } });
    if (genderSearch) queryList.push({ gender: { $in: genderSearch } });
    if (fitLev) queryList.push({ level: { $in: fitLev } });

    let query = {};
    if (queryList.length > 1) query = { $and: queryList };
    else if (queryList.length == 1) query = queryList[0];

    let projection = {};
    if (field) {
      field.split(',').forEach((eachField) => {
        projection[eachField] = 1;
      });
    }

    let sortList: any = {};
    if (lastUpdateSort == 'asc') sortList.lastUpdatedDate = 1;
    else if (lastUpdateSort == 'desc') sortList.lastUpdatedDate = -1;

    let option: any = { skip: (pageNum - 1) * pageSize, limit: pageSize };
    if (sortList != {}) option.sort = sortList;

    return await this.ruleModel.find(query, projection, option);
  }

  async update(id: string, updateVideoDto: UpdateRuleDto) {
    const rule = await this.findById(id); // ใช้ Funtion ร่วมกับในตัวมันเองได้เลย, มีการ throw ได้ตามปกติ
    if (!rule) throw new NotFoundException('Rule Not Found');
    const editRule = new this.ruleModel(Object.assign(rule, updateVideoDto)); // Replace ค่า แบบเอาไปแทนที่ ถ้าเกิดมีค่านั้นๆใน updateVideoDto
    return await editRule.save();
  }

  async delete(id: string) {
    let query = { _id: id };
    return await this.ruleModel.deleteOne(query);
  }
}
