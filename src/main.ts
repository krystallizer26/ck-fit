import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoExceptionFilter } from './mongodb/mongo.exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    "origin": "*",
    "allowedHeaders" : "Authorization,content-type",
    "credentials": true
  });

  //Backend Setup
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip all param which is not in DTO
    }),
  );
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
      .setTitle('CKFit24')
      .setDescription('The CKFit24 API description')
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
  SwaggerModule.setup('/doc', app, document);

  //Config Setup
  const configService = app.get(ConfigService) ;
  const logger = new Logger('App', { timestamp: true });

  // App Initialize
  let port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}
bootstrap();
