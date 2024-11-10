import { CityType } from '../../../../types/city.type.js';
import { LivingPlaceType } from '../../../../types/living-place.type.js';
import { OptionsType } from '../../../../types/options.type.js';
import { User } from '../../../../types/user.type.js';
import { Coordinates } from '../../../../types/coordinates.type.js';

export default class UpdateOfferDto{
  name?: string;
  description?: string;
  createdDate?: Date;
  city?: CityType;
  previewImg?: string;
  images?: string[];
  isPremium?: boolean;
  isFavourites?: boolean;
  rating?: 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
        2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
        3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
        4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
        5;

  livingPlace?: LivingPlaceType;
  roomsCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  peopleCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  price?: number;
  options?: OptionsType;
  author?: User;
  commentsCount?: number;
  coordinates?: Coordinates;
}
