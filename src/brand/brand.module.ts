import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand.controller';
import { BrandSchema } from './entities/brand.entity';
import { BRANDS } from 'src/entities-name/entities.name';

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