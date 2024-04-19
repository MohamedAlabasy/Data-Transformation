import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BRANDS } from 'src/entities-name/entities.name';
import { Brand, BrandDocument } from './entities/brand.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandService {
  private readonly logger = new Logger(BrandService.name);
  private readonly brandNameRegex: RegExp = new RegExp(/(?:brandName|brandsName|brandNames|name|names|BN|B\.N)\b/i);
  private readonly yearFoundedRegex: RegExp = new RegExp(/(?:yearCreated|yearFounded|yearsFounded|yearsCreated|years|year|YC|YF|Y\.C|Y\.F)\b/i);
  private readonly headquartersRegex: RegExp = new RegExp(/(?:headquarters|head|HQ|hqAddress|B\.N)\b/i);
  private readonly numberOfLocationsRegex: RegExp = new RegExp(/(?:numberOfLocations|Locations|Location|N\.O\.L)\b/i);

  constructor(
    @InjectModel(BRANDS) readonly brandModel: Model<BrandDocument>,
    @InjectConnection() private readonly connection: Connection) { }


  async dataTransformation() {
    // const session = await this.connection.startSession();
    try {
      // session.startTransaction();

      const brands: Brand[] = await this.brandModel.find({}, null, /* { session } */).exec();
      if (!brands.length) return { message: 'No data to transformation it' }

      const brandTransformationData = brands.map(_brand => {
        const brand = (_brand as any).toObject();
        const fixedBrandData: Brand = {
          brandName: null,
          yearFounded: 1600,
          headquarters: null,
          numberOfLocations: 1
        }

        for (const brandKey of Object.keys(brand)) {
          if (brand[brandKey] && typeof brand[brandKey] === 'object' && Object.keys(brand[brandKey]).length > 0 && brandKey !== '_id' /* !Types.ObjectId.isValid(brandKey) */) {
            Object.keys(brand[brandKey]).forEach(nestedBrandKey => {
              this.brandRegexTest(nestedBrandKey, brand[brandKey], fixedBrandData);
            })
          } else {
            this.brandRegexTest(brandKey, brand, fixedBrandData);
          }
        }

        return {
          replaceOne: {
            filter: { _id: brand._id },
            replacement: fixedBrandData
          }
        }
      })

      const replaceOldBrandData = await this.brandModel.bulkWrite(brandTransformationData, /* { session } */);
      if (replaceOldBrandData.matchedCount !== brands.length) throw new Error('can\'t update du to database error');

      // await session.commitTransaction();
      return { message: 'brands data transformation successfully' }
    } catch (error) {
      // if (session.inTransaction) await session.abortTransaction();
      this.logger.error('fixDatabaseData : ' + error.message);
      throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
    }
    // finally {
    //   session.endSession()
    // }
  }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
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


  async deleteAllBrand() {
    try {
      let message: string = 'brands deleted successfully';
      const brands = await this.brandModel.deleteMany({});
      if (!brands.acknowledged) throw new Error('can\'t delete du to database error')
      else if (brands.deletedCount <= 0) message = 'No brands to deleted';

      return { message }
    } catch (error) {
      this.logger.error('deleteAllBrand : ' + error.message);
      throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async updateById(_id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      const brand = await this.brandModel.findByIdAndUpdate({ _id }, updateBrandDto, { new: true });
      if (!brand) throw new HttpException('brand not found', HttpStatus.NOT_FOUND);

      return brand;
    } catch (error) {
      this.logger.error('updateById : ' + error.message);
      throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async getById(_id: string): Promise<Brand> {
    try {
      const brand = await this.brandModel.findById(_id).exec();
      if (!brand) throw new HttpException('brand not found', HttpStatus.NOT_FOUND);

      return brand;
    } catch (error) {
      this.logger.error('getById : ' + error.message);
      throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async deleteById(_id: string) {
    try {
      const brand = await this.brandModel.deleteOne({ _id });
      if (brand.deletedCount !== 1) throw new HttpException('brand not found', HttpStatus.NOT_FOUND);

      return { message: 'brand deleted successfully' }
    } catch (error) {
      this.logger.error('deleteById : ' + error.message);
      throw new HttpException(error.message, error.statues || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  private brandRegexTest(brandKey: any, oldBrand: any, fixedBrandData: Brand) {
    if (this.brandNameRegex.test(brandKey)) fixedBrandData.brandName = oldBrand[brandKey];
    else if (this.yearFoundedRegex.test(brandKey)) fixedBrandData.yearFounded = parseInt(oldBrand[brandKey]) || 1600;
    else if (this.headquartersRegex.test(brandKey)) fixedBrandData.headquarters = oldBrand[brandKey];
    else if (this.numberOfLocationsRegex.test(brandKey)) fixedBrandData.numberOfLocations = parseInt(oldBrand[brandKey]) || 1;
  }

}