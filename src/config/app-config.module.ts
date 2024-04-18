import { Module } from '@nestjs/common';
import * as Joi from 'joi'
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_NAME: Joi.string().required(),
        MONGODB_URL: Joi.string().required()
      })
    }),
  ],

  providers: [ConfigService],
  exports: [ConfigService]
})

export class AppConfigModule { }