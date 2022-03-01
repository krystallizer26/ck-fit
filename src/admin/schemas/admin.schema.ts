import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UnauthorizedException } from '@nestjs/common';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: null })
  name: string;

  @Prop({ type: Date, required: true })
  createDate: Date;

  checkPassword?: Function; //make optional for "created later" fields
}

const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.methods.checkPassword = async function (attempt, callback) {
    let user = <AdminDocument>this;
    const match = await bcrypt.compare(attempt, user.password);
    if (!match) throw new UnauthorizedException('Password incorrect');
    return true;
  };

AdminSchema.pre<Admin>('save', function (next) {
  const user = this;
  if (user.password) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  }
});

AdminSchema.set('toJSON', {
  //delete field "only on return as JSON" (not as a mongodb document)
  transform: function (doc, admin, options) {
    delete admin.password;
    return admin;
  },
});

export default AdminSchema; // มัน Export 2 ที่ เลยต้องมีอันนึงเป็น Default
