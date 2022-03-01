import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Admin } from '../../admin/schemas/admin.schema';
import { Video } from '../../video/schemas/video.schema';
import { Gender } from '../../user/interfaces/gender.enum';
import { Level } from '../../user/interfaces/level.enum';
import { BodyPart } from '../../user/interfaces/body-part.enum';
import ActivitySchema, { Activity } from './activity.schema';
let mongoIdValidator = require('mongoose-id-validator')

export type RuleDocument = Rule & Document;

@Schema()
export class Rule {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: null })
  description: string;

  @Prop({ type: Number, required: true })
  age_lowerBound: number;
  @Prop({ type: Number, required: true })
  age_upperBound: number;

  @Prop({ type: Number, required: true })
  weight_lowerBound: number;
  @Prop({ type: Number, required: true })
  weight_upperBound: number;

  @Prop({ type: Number, required: true })
  height_lowerBound: number;
  @Prop({ type: Number, required: true })
  height_upperBound: number;

  @Prop({ type: Number, required: true })
  bmi_lowerBound: number;
  @Prop({ type: Number, required: true })
  bmi_upperBound: number;

  @Prop({ type: [String], enum: Gender, default: [] })
  genderList: string[];

  @Prop({ type: [String], enum: Level, default: [] })
  levelList: string[];

  @Prop({ type: [String], enum: BodyPart, default: [] })
  bodyPartList: string[];

  @Prop({ type: Number, required: true })
  dayCount: number;

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
