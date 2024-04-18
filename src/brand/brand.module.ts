import { Module } from '@nestjs/common';
import { BRANDS } from 'src/entities.name/entities.name';
import { BrandService } from './brand.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand.controller';
import { BrandSchema } from './entities/brand.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BRANDS,
        schema: BrandSchema
      }
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService]
})

export class BrandModule { }