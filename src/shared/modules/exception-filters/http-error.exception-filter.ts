import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import { ServiceError } from '../../types/service-error.enum.js';
import { HttpError } from '../errors/http-error.js';
import { createErrorObject } from '../../../helpers/errors.js';

@injectable()
export default class HttpErrorExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ServiceError.CommonError, error.message));
  }
}
