import { Document } from 'mongoose';
import { BodyPart } from './body-part.enum';
import { DaysInWeek } from './daysInWeek.enum';
import { Level } from './level.enum';
import { Target } from './target.enum';

export interface User extends Document {
  readonly firebaseUserId: String;
  readonly name: String;
  readonly phoneNumber: String;
  readonly age: Number;
  readonly weight: Number;
  readonly height: Number;
  readonly gender: String;
  readonly target: [Target]; //weighLoss, getFit, health, muscle
  readonly bodyPart: [BodyPart]; //arm, shoulder, chest, abdomen, thight, waist
  readonly level: Level;
  readonly excerciseDay: [DaysInWeek];
  readonly exerciseTimeStart: Date;
  readonly exerciseTimeFinish: Date;
  readonly createDate: Date;
}
