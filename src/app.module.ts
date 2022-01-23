import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourcesModule } from './resources/resources.module';
import { VideoModule } from './video/video.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { RuleModule } from './rule/rule.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:dbPass0110@todosystem.8hz9w.mongodb.net/ckfit?retryWrites=true&w=majority',
    ),
    UserModule,
    TestModule,
    ResourcesModule,
    VideoModule,
    AdminModule,
    RuleModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
