import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from '../configs';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRootAsync({
     useFactory: pinoConfig,
     imports: [ConfigService]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
