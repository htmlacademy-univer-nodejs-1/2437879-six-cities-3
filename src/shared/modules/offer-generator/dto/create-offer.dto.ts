import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt, IsMongoId,
  IsNumber,
  IsObject,
  IsString, Length,
  MaxLength,
  MinLength
} from 'class-validator';
import { CityType } from '../../../../types/city.type.js';
import { LivingPlaceType } from '../../../../types/living-place.type.js';
import { OptionsType } from '../../../../types/options.type.js';
import { User } from '../../../../types/user.type.js';
import { Coordinates } from '../../../../types/coordinates.type.js';
import { CreateOfferValidationMessage } from './create-offer-messages.dto.js';

export default class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.name.maxLength })
    name!: string;

  @MinLength(20, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.name.maxLength })
    description!: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.createdDate.invalidFormat})
    createdDate!: Date;

  @IsString({message: CreateOfferValidationMessage.city.invalidFormat})
    city!: CityType;

  @IsString({message: CreateOfferValidationMessage.previewImg.invalidFormat})
    previewImg!: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
    images!: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
    isPremium!: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavourites.invalidFormat})
    isFavourites!: boolean;

  @IsNumber({}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  @Length(1, 5, {message: CreateOfferValidationMessage.rating.lengthField})
    rating!: 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
    2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
    3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
    4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
    5;

  @IsString({message: CreateOfferValidationMessage.livingPlace.invalidFormat})
    livingPlace!: LivingPlaceType;

  @IsInt({message: CreateOfferValidationMessage.roomsCount.invalidFormat})
  @Length(1, 8, {message: CreateOfferValidationMessage.roomsCount.lengthField})
    roomsCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  @IsInt({message: CreateOfferValidationMessage.peopleCount.invalidFormat})
  @Length(1, 10, {message: CreateOfferValidationMessage.peopleCount.lengthField})
    peopleCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  @IsNumber({}, {message: CreateOfferValidationMessage.price.invalidFormat})
  @Length(100, 100000, {message: CreateOfferValidationMessage.price.lengthField})
    price!: number;

  @IsString({message: CreateOfferValidationMessage.options.invalidFormat})
    options!: OptionsType;

  @IsMongoId({ message: CreateOfferValidationMessage.author.invalidId })
    author!: User;

  commentsCount!: number;

  @IsObject({message:CreateOfferValidationMessage.coordinates.invalidFormat})
    coordinates!: Coordinates;
}
