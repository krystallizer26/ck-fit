import * as mongoose from 'mongoose';
import { BodyPart } from '../interfaces/body-part.enum';
import { DaysInWeek } from '../interfaces/daysInWeek.enum';
import { Gender } from '../interfaces/gender.enum';
import { Level } from '../interfaces/level.enum';
import { Target } from '../interfaces/target.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  
  @Prop({ type: String, unique: true, required: true })
  firebaseUserId: string;
  
  @Prop({ type: String, required: true })
  name: string;
  
  @Prop({ type: String, required: true })
  phoneNumber: string;
  
  @Prop({ type: Number, required: true })
  age: number;
  
  @Prop({ type: Number, required: true })
  weight: number;
  
  @Prop({ type: Number, required: true })
  height: number;
  
  @Prop({ type: String, enum: Gender, required: true })
  gender: string;
  
  @Prop({ type: [String], enum: Target, default: [Target.WEIGHLOSS] })
  target: string[];
  
  @Prop({ type: [String], enum: BodyPart, default: [BodyPart.ARM] })
  bodyPart: string[];
  
  @Prop({ type: String,enum: Level,default: Level.BEGINNER})
  level: string;
  
  @Prop({ type: [String],enum: DaysInWeek,default: [DaysInWeek.SAT, DaysInWeek.SUN]})
  excerciseDay: string[];
  
  @Prop({ type: Date, required: true })
  exerciseTimeStart: Date;
  
  @Prop({ type: Date, required: true })
  exerciseTimeFinish: Date;
  
  @Prop({ type: Date, required: true })
  createDate: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
