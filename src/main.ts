import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomErrorExceptionFilter } from './App/middlewares/customError.middleware';
import { TypeOrmExceptionFilter } from './App/middlewares/typeOrmError.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalFilters(new CustomErrorExceptionFilter());

  await app.listen(3000);
}
bootstrap();
