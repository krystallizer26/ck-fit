import { Controller, Get, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testSrevice: TestService) {}

  @Get('')
  @UseGuards(FirebaseAuthGuard)
  getAll() {
    return this.testSrevice.testFirebaseAuth();
  }
}
