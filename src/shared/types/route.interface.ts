import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from './http-method.enum.js';
import { Middleware } from '../../shared/modules/middleware/middleware.interface.js';


export interface RouteInterface {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
