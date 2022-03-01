import * as mongoose from 'mongoose';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import AdminSchema, { Admin } from '../../admin/schemas/admin.schema';
import { BilingualDto } from '../../_common/dto/bilingual.dto';
import { BodyPart } from '../../user/interfaces/body-part.enum';
let mongoIdValidator = require('mongoose-id-validator')

export type VideoDocument = Video & Document;

@Schema()
export class Video {

  @Prop({ type: BilingualDto, required: true })
  videoUrl: BilingualDto;
  
  @Prop({ type: BilingualDto, required: true })
  videoName : BilingualDto;
  
  @Prop({ type: Boolean, required: true })
  public : boolean;

  @Prop({ type: [String], enum: BodyPart, default: [] })
  focused: string[];

  @Prop({ type: Number, required: true })
  videoTime: number;
  
  @Prop({ type: Number, required: true })
  burn: number;
  
  @Prop({ type: [String], default: [] })
  equipment: string[];

  @Prop({ type: BilingualDto, required: true })
  guidance : BilingualDto;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
  createdBy: Admin;

  @Prop({ type: Date, required: true })
  createDate: Date;
}

const VideoSchema = SchemaFactory.createForClass(Video);

export default VideoSchema 
