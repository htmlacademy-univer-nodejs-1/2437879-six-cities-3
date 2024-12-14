import { inject, injectable } from 'inversify';
import CreateOfferDto from './dto/create-offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFERS_COUNT } from './offer.constant.js';
import { SortType } from '../../../types/sort.type.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
        @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
        @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate('userId').exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limitCount = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(limitCount)
      .populate('userId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, {new: true}).populate('userId').exec();
  }

  public async getDetailsInfo(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async incCommentsCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }
      }).exec();
  }

  public async getPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({flagIsPremium: true}).populate('userId').exec();
  }

  public async getFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({flagIsFavourites: true}).populate('offerId').exec();
  }

  public async calculationRating(rating: number, newRating: number, countRating: number, offerId: string): Promise<void> {
    await this.offerModel.findByIdAndUpdate(offerId, {rating: (newRating + rating) / countRating}, {new: true}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city: city, premium: true})
      .sort({createdAt: SortType.Down})
      .limit(DEFAULT_PREMIUM_OFFERS_COUNT)
      .populate('userId')
      .exec();
  }

  public async addFavorite(offerId: string, userId: string): Promise<void> {
    await this.offerModel.updateOne(
      {_id: userId},
      { $addToSet: { favorites: offerId } }
    );
  }

  public async deleteFavorite(offerId: string, userId: string): Promise<void> {
    await this.offerModel.updateOne(
      {_id: userId},
      { $pull: { favorites: offerId } }
    );
  }
}
