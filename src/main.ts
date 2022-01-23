import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoExceptionFilter } from './mongodb/mongo.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Backend Setup
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip all param which is not in DTO
    }),
  );
  const logger = new Logger('App', { timestamp: true });
  app.useGlobalFilters(new MongoExceptionFilter());

  //Frontend Setup
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'main' });

  //Doc Setup
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          description: `Token ของผู้เข้าใช้ระบบ จากการ Authentication กับ firebase โดยส่งมาในรูปแบบ Bearer Token`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'firebase-token',
      )
      .addBearerAuth(
        {
          description: `Token ของผู้ดูแลระบบจากการ Authentication กับระบบตัวเองผ่าน /api/login โดยส่งมาในรูปแบบ Bearer Token`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'admin-token',
      )
      .build(),
  );
  SwaggerModule.setup('/api/doc', app, document);

  let port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Listening on port ${port}`); // ใช้ logger
}
bootstrap();
