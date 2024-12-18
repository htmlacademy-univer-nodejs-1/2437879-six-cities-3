import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { CityType } from '../../../../types/city.type.js';
import { LivingPlaceType } from '../../../../types/living-place.type.js';
import { OptionsType } from '../../../../types/options.type.js';
import { CreateOfferValidationMessage } from './create-offer-messages.dto.js';

export default class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.name.maxLength })
  public name!: string;

  @MinLength(20, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.name.maxLength })
  public description!: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.createdDate.invalidFormat})
  public createdDate!: Date;

  @IsString({message: CreateOfferValidationMessage.city.invalidFormat})
  public city!: CityType;

  @IsString({message: CreateOfferValidationMessage.previewImg.invalidFormat})
  public previewImg!: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  public images!: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium!: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavourites.invalidFormat})
  public isFavourites!: boolean;

  @IsNumber({}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  public rating!: 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
    2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
    3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
    4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
    5;

  @IsString({message: CreateOfferValidationMessage.livingPlace.invalidFormat})
  public livingPlace!: LivingPlaceType;

  @IsInt({message: CreateOfferValidationMessage.roomsCount.invalidFormat})
  public roomsCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  @IsInt({message: CreateOfferValidationMessage.peopleCount.invalidFormat})
  public peopleCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  @IsNumber({}, {message: CreateOfferValidationMessage.price.invalidFormat})
  public price!: number;

  @IsString({message: CreateOfferValidationMessage.options.invalidFormat})
  public options!: OptionsType;

  public userId!: string;

  public commentsCount!: number;

  @IsArray({message: CreateOfferValidationMessage.coordinates.invalidFormat})
  public coordinates!: number[];
}
