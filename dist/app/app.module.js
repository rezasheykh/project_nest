"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const timeout_interceptor_1 = require("../common/interceptors/timeout.interceptor");
const notify_module_1 = require("../notify/notify.module");
const user_module_1 = require("../user/user.module");
const event_module_1 = require("../event/event.module");
const utility_module_1 = require("../utility/utility.module");
const translate_module_1 = require("../translate/translate.module");
const textfields_module_1 = require("../textfields/textfields.module");
const logger_service_1 = require("../logger/logger.service");
const currency_module_1 = require("../currency/currency.module");
const post_module_1 = require("../post/post.module");
const app_config_1 = require("./config/app.config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            post_module_1.PostModule,
            notify_module_1.NotifyModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule.forFeature(app_config_1.default)],
                useFactory: (app) => (Object.assign(Object.assign({ type: 'mssql' }, app.database), { extra: {
                        trustServerCertificate: true,
                    }, synchronize: true, autoLoadEntities: true })),
                inject: [app_config_1.default.KEY],
            }),
            config_1.ConfigModule.forRoot({
                load: [app_config_1.default],
                validationSchema: Joi.object({
                    HOST: Joi.string().required(),
                    PORT: Joi.number().required(),
                    USER_NAME: Joi.string().default('user1'),
                }),
            }),
            notify_module_1.NotifyModule,
            user_module_1.UserModule,
            event_module_1.EventModule,
            utility_module_1.UtilityModule,
            currency_module_1.CurrencyModule,
            translate_module_1.TranslateModule,
            textfields_module_1.TextfieldsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: timeout_interceptor_1.TimeoutInterceptor,
            },
            logger_service_1.LoggerService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map