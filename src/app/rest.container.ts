import Application from './rest.js';
import { AppComponent } from '../types/app-component.enum.js';
import { LoggerInterface } from '../shared/modules/logger/logger.interface.js';
import PinoService from '../shared/modules/logger/pino.service.js';
import { ConfigInterface } from '../shared/modules/config/config.interface.js';
import { RestSchema } from '../shared/modules/config/rest.schema.js';
import ConfigService from '../shared/modules/config/config.service.js';
import { DatabaseClientInterface } from '../shared/modules/database-client/database-client.interface.js';
import MongoClientService from '../shared/modules/database-client/mongo-client.service.js';
import { Container } from 'inversify';
import { ExceptionFilterInterface } from '../shared/modules/exception-filters/exception-filter.interface.js';
import { ExceptionFilter } from '../shared/modules/exception-filters/exception-filter.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<Application>(AppComponent.Application).to(Application).inSingletonScope();
  restApplicationContainer.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  restApplicationContainer.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  restApplicationContainer.bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilterInterface>(AppComponent.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}
