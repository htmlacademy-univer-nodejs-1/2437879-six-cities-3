export const AppComponent = {
  Application: Symbol.for('Application'),

  LoggerInterface: Symbol.for('LoggerInterface'),

  ConfigInterface: Symbol.for('ConfigInterface'),

  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),

  UserServiceInterface: Symbol.for('UserServiceInterface'),

  UserModel: Symbol.for('UserModel'),

  OfferServiceInterface: Symbol.for('OfferServiceInterface'),

  OfferModel: Symbol.for('OfferModel'),

  CommentServiceInterface: Symbol.for('CommentServiceInterface'),

  CommentModel: Symbol.for('CommentModel'),

  UserController: Symbol.for('UserController'),

  OfferController: Symbol.for('OfferController'),

  CommentController: Symbol.for('CommentController'),

  HttpErrorExceptionFilter: Symbol.for('HttpErrorExceptionFilter'),

  BaseExceptionFilter: Symbol.for('BaseExceptionFilter'),

  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
} as const;
