import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    methods: 'GET,POST,PATCH,DELETE',
    origin: '*'
  })

  await app.listen(config.get('PORT'));
}

bootstrap();