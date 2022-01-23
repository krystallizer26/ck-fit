import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user/interfaces/user.interface';

export const ExtractUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => { // ใส่ _ หน้า data เพื่อเป็นการแปะว่าเราไม่ใช้ตัวแปรนี้ มันจะได้ไม่แจ้งเตือน
    const req = ctx.switchToHttp().getRequest(); 
    return req.user; // ดึงออกมาได้เลย เพราะว่ามันผ่านการแกะ แล้วแปะไว้ใน req.user แล้ว ตอน validate
  },
);
