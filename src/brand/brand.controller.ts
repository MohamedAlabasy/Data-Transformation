import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ParseObjectIdPipe } from 'src/validators/parse-object-id-pipe.Validators';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post('data-transformation')
  async dataTransformation() {
    return await this.brandService.dataTransformation();
  }

  @Get('brans-json-file')
  async getBransJsonFile() {
    return await this.brandService.getBransJsonFile();
  }

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }

  @Get()
  async getAllBrand() {
    return await this.brandService.getAllBrand();
  }

  @Delete()
  async deleteAllBrand() {
    return await this.brandService.deleteAllBrand();
  }


  @Patch(':id')
  async updateById(@Param('id', ParseObjectIdPipe) id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return await this.brandService.updateById(id, updateBrandDto);
  }


  @Get(':id')
  async getById(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.brandService.getById(id);
  }


  @Delete(':id')
  async deleteById(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.brandService.deleteById(id);
  }
}
