import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CreateBrandDto } from 'src/brand/dto/create-brand.dto';

@Injectable()
export class SeedModuleService {
  private readonly logger = new Logger(SeedModuleService.name);

  constructor(private readonly brandService: BrandService) { }

  @Command({ command: 'create:brand', describe: 'create a brand' })
  async create() {
    const createBrandDto: CreateBrandDto[] = [];
    for (let i = 0; i < 10; i++) {
      createBrandDto.push({
        brandName: 'brandName',
        yearFounded: 1600,
        headquarters: 'headquarters',
        numberOfLocations: 10,
      })
    }

    const brand = await this.brandService.brandModel.insertMany(createBrandDto);
    console.log(brand);
    this.logger.log('10 brands created successfully')
  }
}
