import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/log4js/logger.module';
import { LoggerMiddleware } from './common/log4js/logger.middleware';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [LoggerModule, UserModule, CommentModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
