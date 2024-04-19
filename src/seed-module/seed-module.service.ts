import { Command } from 'nestjs-command';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CreateBrandDto } from 'src/brand/dto/create-brand.dto';

@Injectable()
export class SeedModuleService {
  constructor(private readonly brandService: BrandService) { }

  @Command({ command: 'create:brand', describe: 'create 10 brands' })
  async create() {
    const createBrandDto: CreateBrandDto[] = faker.helpers.multiple(this.createRandomBrand, { count: 10 });
    const brand = await this.brandService.brandModel.insertMany(createBrandDto);
    console.log(brand);
  }


  private createRandomBrand(): CreateBrandDto {
    return {
      brandName: faker.internet.userName(),
      yearFounded: faker.number.int({ min: 1600, max: new Date().getFullYear() }),
      headquarters: faker.internet.userName(),
      numberOfLocations: faker.number.int({ min: 1 }),
    }
  }
}
