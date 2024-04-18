import { Logger } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const databaseConnection = MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGODB_URL') + configService.get('DB_NAME');
        new Logger('databaseConnection').verbose(`connection to ${uri}`);
        return { uri }
    },
    inject: [ConfigService]
})