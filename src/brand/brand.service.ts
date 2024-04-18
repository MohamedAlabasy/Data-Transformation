import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BRANDS } from 'src/entities-name/entities.name';
import { Brand, BrandDocument } from './entities/brand.entity';

import { readFileSync } from 'fs';
import { join } from 'path';
@Injectable()
export class BrandService {
  private readonly logger = new Logger(BrandService.name);

  constructor(
    @InjectModel(BRANDS) private readonly brandModel: Model<BrandDocument>,
    @InjectConnection() private readonly connection: Connection) { }

  // async insertBrandsToDatabaseOnModuleInit() {
  //   const reset = await this.resetBrandsData();
  //   this.logger.log(reset.message);
  // }


  async resetBrandsData() {
    try {
      const filePath = join(process.cwd(), 'brands.json');
      const jsonData = readFileSync(filePath, 'utf8');
      const brandsData = JSON.parse(jsonData);
      console.log(brandsData);
      if (!brandsData) throw Error('can\'t get data from brandsData')

      const deleteBrandsData = await this.brandModel.deleteMany({});
      const saveBrandsData = await this.brandModel.insertMany(brandsData, { throwOnValidationError: false });
      // const saveBrandsData = await this.brandModel.bulkSave(brandsData, { timestamps: true, bypassDocumentValidation: false, forceServerObjectId: true } /* { session } */);
      console.log(saveBrandsData);

      return { message: 'reset brands data successfully' }
    } catch (error) {
      this.logger.error('resetBrandsData : ' + error);
      throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  // async dataTransformation() {
  //   const session = await this.connection.startSession();
  //   try {
  //     session.startTransaction();

  //     const data = await this.brandModel.find({}, null, { session }).exec();

  //     session.commitTransaction();
  //     return data
  //   } catch (error) {
  //     if (session.inTransaction) await session.abortTransaction();
  //     this.logger.error('fixDatabaseData : ' + error.message);
  //     throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
  //   } finally {
  //     session.endSession()
  //   }
  // }


  // async create(createBrandDto: CreateBrandDto): Promise<Brand> {
  //   try {
  //     const createdBrand = new this.brandModel(createBrandDto);
  //     return await createdBrand.save();
  //   } catch (error) {
  //     this.logger.error('create : ' + error.message);
  //     throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }


  // async updateById(_id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
  //   try {
  //     const brand = await this.brandModel.findByIdAndUpdate({ _id }, updateBrandDto);
  //     if (!brand) throw new HttpException('brand not found', HttpStatus.NOT_FOUND);

  //     return brand;
  //   } catch (error) {
  //     this.logger.error('updateById : ' + error.message);
  //     throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }


  // async getById(_id: string): Promise<Brand> {
  //   try {
  //     const brand = await this.brandModel.findById(_id).exec();
  //     if (!brand) throw new HttpException('brand not found', HttpStatus.NOT_FOUND);

  //     return brand;
  //   } catch (error) {
  //     this.logger.error('getById : ' + error.message);
  //     throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }


  // async getAllBrand(): Promise<Brand[]> {
  //   try {
  //     return await this.brandModel.find().exec();
  //   } catch (error) {
  //     this.logger.error('getAllBrand : ' + error.message);
  //     throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }


  // async deleteAllBrand() {
  //   try {
  //     return await this.brandModel.deleteMany({});
  //   } catch (error) {
  //     this.logger.error('deleteAllBrand : ' + error.message);
  //     throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }


  // async deleteById(_id: string) {
  //   try {
  //     return await this.brandModel.deleteOne({ _id });
  //   } catch (error) {
  //     this.logger.error('deleteById : ' + error.message);
  //     throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }



}
