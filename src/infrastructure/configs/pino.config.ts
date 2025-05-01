import { ConfigService } from '@nestjs/config';

export const pinoConfig = (configService: ConfigService) => {
  const NODE_ENV = configService.get('NODE_ENV');
  const APP_NAME = configService.get('APP_NAME');
  const LOG_LEVEL = configService.get('LOG_LEVEL');
  const isProduction = NODE_ENV?.includes('prod');

  return {
    pinoHttp: {
      name: APP_NAME,
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
  };
};
