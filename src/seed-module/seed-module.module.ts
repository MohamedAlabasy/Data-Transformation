import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { BrandModule } from 'src/brand/brand.module';
import { SeedModuleService } from './seed-module.service';

@Module({
  imports: [
    BrandModule,
    CommandModule,
  ],
  providers: [SeedModuleService],
})

export class SeedModuleModule { }