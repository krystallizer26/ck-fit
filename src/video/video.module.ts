import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuthStrategy } from '../auth/strategies/admin-auth.strategy';
import VideoSchema, { Video } from './schemas/video.schema';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'admin-auth'}),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1800s' }
    }),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
  ],
  controllers: [VideoController],
  providers: [VideoService, AdminAuthStrategy]
})
export class VideoModule {}
