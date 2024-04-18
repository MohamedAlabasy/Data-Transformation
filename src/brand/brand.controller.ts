import { Controller, Get, Post, Body, Patch, Param, Delete, OnModuleInit, Res, StreamableFile } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('brand')
export class BrandController implements OnModuleInit {
  constructor(private readonly brandService: BrandService) { }

  async onModuleInit() {
    // await this.brandService.insertBrandsToDatabaseOnModuleInit()
  }

  // @Post('reset-brands-data')
  // async resetBrandsData() {
  //   return await this.brandService.resetBrandsData();
  // }


  @Post('data-transformation')
  async dataTransformation() {
    return await this.brandService.dataTransformation();
  }

  // @Get()
  // getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
  //   const file = createReadStream(join(process.cwd(), 'brands.json'));
  //   res.set({
  //     'Content-Type': 'application/json',
  //     'Content-Disposition': 'attachment; filename="brands.json"',
  //   });
  //   return new StreamableFile(file);
  // }

  // @Post()
  // async create(@Body() createBrandDto: CreateBrandDto) {
  //   return await this.brandService.create(createBrandDto);
  // }

  // @Get()
  // async getAllBrand() {
  //   return await this.brandService.getAllBrand();
  // }
}
