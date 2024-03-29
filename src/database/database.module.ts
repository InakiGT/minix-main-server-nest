import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, dbName } = configService.mongo;

        return {
          uri: connection,
          user,
          pass: password,
          dbName,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
