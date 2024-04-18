import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  console.log(config.get('PORT'));

  await app.listen(config.get('PORT'));
}
bootstrap();
