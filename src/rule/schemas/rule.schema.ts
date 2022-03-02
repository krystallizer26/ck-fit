import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Admin } from '../../admin/schemas/admin.schema';
import { Video } from '../../video/schemas/video.schema';
import { Gender } from '../../user/interfaces/gender.enum';
import { Level } from '../../user/interfaces/level.enum';
import { BodyPart } from '../../user/interfaces/body-part.enum';
import ActivitySchema, { Activity } from './activity.schema';
import { RangeDto } from '../../_common/dto/range.dto copy';
let mongoIdValidator = require('mongoose-id-validator')

export type RuleDocument = Rule & Document;

@Schema()
export class Rule {
  @Prop({ type: String, required: true })
  ruleName: string;

  @Prop({ type: String, default: null })
  description: string;

  @Prop({ type: RangeDto, required: true })
  ageRange: RangeDto;

  @Prop({ type: RangeDto, required: true })
  weightRange: RangeDto;

  @Prop({ type: RangeDto, required: true })
  heightRange: RangeDto;

  @Prop({ type: [String], enum: Gender, default: [] })
  gender: string[];
   
  @Prop({ type: [String], enum: Level, default: [] })
  level: string[];

  @Prop({ type: [String], enum: BodyPart, default: [] })
  focused: string[];

  @Prop({ type: Number, required: true })
  numberDay: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
  createdBy: Admin;

  @Prop({ type: Date, required: true })
  createDate: Date;

  @Prop({ type: Date, required: true })
  lastUpdatedDate: Date;

  @Prop({ type: [ActivitySchema], required: true })
  activity: Array<Activity>;
}

const RuleSchema = SchemaFactory.createForClass(Rule);

export default RuleSchema;
