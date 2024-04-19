import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { AppConfigModule } from './config/app-config.module';
import { databaseConnection } from './config/database-connection';
import { SeedModuleModule } from './seed-module/seed-module.module';

@Module({
  imports: [
    AppConfigModule,
    databaseConnection,
    BrandModule,
    SeedModuleModule
  ]
})

export class AppModule { }