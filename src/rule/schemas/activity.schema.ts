import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Admin } from '../../admin/schemas/admin.schema';
import { Video } from '../../video/schemas/video.schema';
import { Gender } from '../../user/interfaces/gender.enum';
import { Level } from '../../user/interfaces/level.enum';
import { BodyPart } from '../../user/interfaces/body-part.enum';
let mongoIdValidator = require('mongoose-id-validator')

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity extends mongoose.Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true })
    video: Video;
    
    @Prop({ type: Number, required: true })
    daySpan_start: number;
}
export const ActivitySchema = SchemaFactory.createForClass(Activity);

export default ActivitySchema;
