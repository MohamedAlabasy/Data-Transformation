import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { BRANDS } from 'src/entities.name/entities.name';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandDocument } from './entities/brand.entity';

@Injectable()
export class BrandService {
  private readonly logger = new Logger(BrandService.name);

  constructor(@InjectModel(BRANDS) private readonly brandModel: Model<BrandDocument>) { }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      // const brand: Brand = {
      //   brandName: 'brandName',
      //   yearFounded: 20,
      //   headquarters: 'headquarters',
      //   numberOfLocations: 50
      // }

      const createdBrand = new this.brandModel(createBrandDto);
      return await createdBrand.save();
    } catch (error) {
      this.logger.error('create : ' + error.message);
      throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async getAllBrand(): Promise<Brand[]> {
    try {
      return await this.brandModel.find().exec();
    } catch (error) {
      this.logger.error('getAllBrand : ' + error.message);
      throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
