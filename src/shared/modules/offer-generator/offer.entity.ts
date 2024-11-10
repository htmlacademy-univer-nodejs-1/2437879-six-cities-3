import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { Offer } from '../../../types/offer.type.js';
import { CityType } from '../../../types/city.type.js';
import { LivingPlaceType } from '../../../types/living-place.type.js';
import { OptionsType } from '../../../types/options.type.js';
import { UserEntity } from '../user/user.entity.js';
import { User } from '../../../types/user.type.js';
import { Coordinates } from '../../../types/coordinates.type.js';

const { prop, modelOptions } = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
    @prop({
      required: true,
      minlength: [10, 'Min length for name is 10'],
      maxlength: [100, 'Min length for name is 100']
    })
  public name!: string;

    @prop({
      required: true,
      minlength: [20, 'Min length for description is 20'],
      maxlength: [1024, 'Min length for description is 1024']
    })
    public description!: string;

    @prop({required: true})
    public createdDate!: Date;

    @prop({
      required: true,
      type: () => String,
      enum: CityType
    })
    public city!: CityType;

    @prop({required: true})
    public previewImg!: string;

    @prop({
      required: true,
      type: () => String,
    })
    public images!: string[];

    @prop({required: true})
    public isPremium!: boolean;

    @prop({required: true})
    public isFavourites!: boolean;

    @prop({required: true})
    public rating!: 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
    2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
    3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
    4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
    5;

    @prop({
      required: true,
      type: () => String,
      enum: LivingPlaceType
    })
    public livingPlace!: LivingPlaceType;

    @prop({required: true})
    public roomsCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    @prop({required: true})
    public peopleCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

    @prop({
      required: true,
      min: [100, 'Min length for price is 100'],
      max: [100000, 'Min length for price is 100000'],
    })
    public price!: number;

    @prop({
      required: true,
      type: () => String,
      enum: OptionsType
    })
    public options!: OptionsType;

    @prop({
      required: true,
      ref: UserEntity,
    })
    public author!: User;

    @prop({default: 0})
    public commentsCount!: number;

    @prop({
      required: true,
      type: () => String,
    })

    @prop({required: true})
    public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
