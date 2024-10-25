import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

const { NODE_ENV, LOG_LEVEL } = process.env;

const isProduction = ['prod', 'production'].includes(NODE_ENV ?? '');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'DATASERVER',
        level: LOG_LEVEL ?? 'info',
        transport: isProduction
          ? undefined
          : {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
