import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { BaseController } from '../../controller/base-controller.js';
import { AppComponent } from '../../../../types/app-component.enum.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { CommentService } from '../comment.service.js';
import OfferService from '../../offer-generator/offer.service.js';
import { HttpMethod } from '../../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../errors/http-error.js';
import { fillDTO } from '../../../../helpers/fill-dto.js';
import { CommentRdo } from '../rdo/comment.rdo.js';
import CreateCommentDto from '../dto/create-comment.dto.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentService,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);

    await this.offerService.incCommentsCount(body.offerId);

    this.created(res, fillDTO(CommentRdo, comment));
  }
}