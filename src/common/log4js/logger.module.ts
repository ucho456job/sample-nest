import { Module } from '@nestjs/common';
import { CustomLogger } from './logger.service';
import { configure, getLogger, LoggingEvent } from 'log4js';

const config = {
  appenders: {
    access: {
      type: 'file',
      filename: 'log/trace.log',
      maxLogSize: 10485760,
      category: 'access',
      layout: {
        type: 'pattern',
        pattern:
          '[%d{yyyy/MM/dd hh.mm.ss.SSS}],[%p],[%X{ip}],[%X{method} %X{uri}],[%X{file} %X{line}:%X{column} %X{function}],%m',
      },
    },
    console: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern:
          '[%d{yyyy/MM/dd hh.mm.ss.SSS}],%m,\n"httpRequest":%x{httpRequest}}\n\n',
        tokens: {
          httpRequest: (event: LoggingEvent) => {
            return JSON.stringify({
              requestMethod: event.context['req.method'] ?? void 0,
              requestUrl: event.context['req.url'] ?? void 0,
              remoteIp: event.context['req.ip'] ?? void 0,
            });
          },
        },
      },
    },
  },
  categories: {
    default: {
      appenders: ['access', 'console'],
      level: 'INFO',
    },
  },
};

const loggerFactory = {
  provide: CustomLogger,
  useFactory: () => {
    configure(config);
    return new CustomLogger(getLogger('default'));
  },
};

@Module({
  providers: [loggerFactory],
  exports: [loggerFactory],
})
export class LoggerModule {}
