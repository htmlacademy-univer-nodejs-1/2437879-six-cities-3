import cors from 'cors';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../shared/modules/logger/logger.interface.js';
import { ConfigInterface } from '../shared/modules/config/config.interface.js';
import { RestSchema } from '../shared/modules/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';
import { getMongoURI } from '../helpers/db.js';
import { getFullServerPath } from '../helpers/server-path.js';
import { DatabaseClientInterface } from '../shared/modules/database-client/database-client.interface.js';
import express, { Express } from 'express';
import { ExceptionFilterInterface } from '../shared/modules/exception-filters/exception-filter.interface.js';
import { BaseController } from '../shared/modules/controller/base-controller.js';
import { AuthenticateMiddleware } from '../shared/modules/middleware/authenticate.middleware.js';

@injectable()
export default class Application {
  private server: Express;

  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
              @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
              @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
              @inject(AppComponent.UserController) private readonly userController: BaseController,
              @inject(AppComponent.OfferController) private readonly offerController: BaseController,
              @inject(AppComponent.CommentController) private readonly commentController: BaseController,
              @inject(AppComponent.HttpErrorExceptionFilter) private readonly httpErrorExceptionFilter: ExceptionFilterInterface,
              @inject(AppComponent.BaseExceptionFilter) private readonly baseExceptionFilter: ExceptionFilterInterface,
              @inject(AppComponent.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilterInterface,
  ) {
    this.server = express();
  }

  private async _initDb() {
    this.logger.info('Init database...');

    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    this.logger.info('Init database completed');

    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    this.logger.info('Try to init server...');

    const port = this.config.get('PORT');
    this.server.listen(port);

    this.logger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }

  private async _initControllers() {
    this.logger.info('Controller init...');

    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);

    this.logger.info('Controller completed');
  }

  private async _initMiddleware() {
    this.logger.info('Init middleware...');

    this.server.use(express.json());

    this.server.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );

    this.server.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));

    this.server.use(cors());

    this.logger.info('Middleware init completed');
  }

  private async _initExceptionFilters() {
    this.logger.info('Init exception filters...');

    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpErrorExceptionFilter.catch.bind(this.httpErrorExceptionFilter));
    this.server.use(this.baseExceptionFilter.catch.bind(this.baseExceptionFilter));

    this.logger.info('Exception filters completed');
  }

  public async init() {
    this.logger.info('Application init...');
    await this._initDb();
    await this._initMiddleware();
    await this._initExceptionFilters();
    await this._initServer();
    await this._initControllers();
  }
}
