import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { AppConfigModule } from './config/app-config.module';
import { databaseConnection } from './config/database-connection';

@Module({
  imports: [
    AppConfigModule,
    databaseConnection,
    BrandModule
  ]
})

export class AppModule { }