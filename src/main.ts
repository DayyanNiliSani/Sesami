import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomErrorExceptionFilter } from './App/middlewares/customError.middleware';
import { TypeOrmExceptionFilter } from './App/middlewares/typeOrmError.middleware';

import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const appConfig = config.get('api') as {
  port: string;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Sesami')
    .setDescription('Booking Appointment')
    .setVersion('1.0')
    .addTag('Sesami')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalFilters(new CustomErrorExceptionFilter());

  await app.listen(appConfig.port, '0.0.0.0');
}
bootstrap();
