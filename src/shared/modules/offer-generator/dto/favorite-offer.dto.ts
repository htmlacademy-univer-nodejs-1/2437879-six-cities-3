import { Expose } from 'class-transformer';
import { CityType } from '../../../../types/city.type.js';
import { LivingPlaceType } from '../../../../types/living-place.type.js';

export class FavoriteOfferDto {
  @Expose()
  public id!: string;

  @Expose()
    name!: string;

  @Expose({ name: 'createdAt'})
    createdDate!: Date;

  @Expose()
    description!: string;

  @Expose()
    city!: CityType;

  @Expose()
    previewImg!: string;

  @Expose()
    isPremium!: boolean;

  isFavourites = true;

  @Expose()
    rating!: number;

  @Expose()
    livingPlace!: LivingPlaceType;

  @Expose()
    price!: number;

  @Expose()
    commentsCount!: number;
}
