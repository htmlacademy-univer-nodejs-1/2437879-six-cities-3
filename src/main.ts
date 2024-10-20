import 'reflect-metadata';
import PinoService from './shared/libs/logger/pino.service.js';
import Application from './app/rest.js';
import ConfigService from './shared/libs/config/config.service.js';
import { Container } from 'inversify';
import { AppComponent } from './types/app-component.enum.js';
import { LoggerInterface } from './shared/libs/logger/logger.interface.js';
import { ConfigInterface } from './shared/libs/config/config.interface.js';
import { RestSchema } from './shared/libs/config/rest.schema.js';

async function bootstrap() {
  const container = new Container();

  container.bind<Application>(AppComponent.Application).to(Application).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();

  const application = container.get<Application>(AppComponent.Application);

  await application.init();
}

bootstrap();
