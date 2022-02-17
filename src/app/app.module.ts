import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import { TimeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';
import { NotifyModule } from 'src/notify/notify.module';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';
import { UtilityModule } from 'src/utility/utility.module';
import { TranslateModule } from 'src/translate/translate.module';
import { TextfieldsModule } from 'src/textfields/textfields.module';
import { LoggerService } from 'src/logger/logger.service';
import { CurrencyModule } from 'src/currency/currency.module';
import { PostModule } from 'src/post/post.module';
import appConfig from './config/app.config';
@Module({
  imports: [
    PostModule,
    NotifyModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      useFactory: (app: ConfigType<typeof appConfig>) => ({
        type: 'mssql',
        ...app.database,
        extra: {
          trustServerCertificate: true,
        },
        synchronize: true,
        autoLoadEntities: true,
        // logging: true,
        // validationSchema: joi.object({
        //   TimeoutInterceptor: join.number(),
        // }),
      }),
      inject: [appConfig.KEY],
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      // envFilePath: '.enviroment',
      // ignoreEnvFile: true,
      validationSchema: Joi.object({
        HOST: Joi.string().required(),
        PORT: Joi.number().required(),
        USER_NAME: Joi.string().default('user1'),
      }),
    }),
    NotifyModule,
    UserModule,
    EventModule,
    UtilityModule,
    CurrencyModule,
    TranslateModule,
    TextfieldsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    LoggerService,
  ],
})
export class AppModule {}
