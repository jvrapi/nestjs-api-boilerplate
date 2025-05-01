import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './infrastructure/modules/app.module';
import { HttpExceptionFilter } from './presentation/http/filters/http-exception.filter';

const { PORT = 3000, BIND_ADDRESS = '0.0.0.0' } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, BIND_ADDRESS, (_, address) => {
    new NestLogger('bootstrap').log(`Service is running in ${address} ️‍🔥`);
  });
}
bootstrap();
