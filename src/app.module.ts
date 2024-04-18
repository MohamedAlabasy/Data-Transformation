import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/restaurant'),
    BrandModule
  ]
})

export class AppModule { }