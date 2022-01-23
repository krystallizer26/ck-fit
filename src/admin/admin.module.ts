import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import AdminSchema, { Admin } from './schemas/admin.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthStrategy } from '../auth/strategies/admin-auth.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'admin-auth'}),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1800s' }
    }),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminAuthStrategy],
})
export class AdminModule {}
