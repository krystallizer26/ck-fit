import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Admin } from '../../admin/schemas/admin.schema';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  
  @Prop({ type: [String], required: true })
  videoUrl: string[];
  
  @Prop({ type: String, required: true })
  name: string;
  
  @Prop({ type: Number, required: true })
  duration: number;
  
  @Prop({ type: Number, required: true })
  cal: number;
  
  @Prop({ type: [String], default: [] })
  equipment: string[];

  @Prop({ type: String, default: null })
  description: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
  createdBy: Admin;

  @Prop({ type: Date, required: true })
  createDate: Date;
}

const VideoSchema = SchemaFactory.createForClass(Video);

export default VideoSchema 
