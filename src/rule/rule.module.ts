import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import RuleSchema, { Rule } from './schemas/rule.schema';
import { AdminAuthStrategy } from '../auth/strategies/admin-auth.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'admin-auth'}),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1800s' }
    }),
    MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }])
  ],
  controllers: [RuleController],
  providers: [RuleService, AdminAuthStrategy]
})
export class RuleModule {}
