import { LoggerService, Injectable, Scope } from '@nestjs/common';
import { Logger } from 'log4js';
import { Request } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  constructor(private readonly logger: Logger) {}
  setRequestInfo(req: Request & { rawBody?: string }) {
    this.logger.addContext('req.ip', req.ip);
    this.logger.addContext('req.method', req.method);
    this.logger.addContext('req.url', req.url);
  }
  log(message: any, context?: string) {
    this.logger.log(message, context ? context : '');
  }
  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, trace ? trace : '', context ? context : '');
  }
  warn(message: any, context?: string) {
    this.logger.warn(message, context ? context : '');
  }
  debug?(message: any, context?: string) {
    this.logger.debug(message, context ? context : '');
  }
}
