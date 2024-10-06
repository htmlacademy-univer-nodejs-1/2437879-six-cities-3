import { Offer } from '../types/offer.type.js';
import { CityType } from '../types/city.type.js';
import { LivingPlaceType } from '../types/living-place.type.js';
import { OptionsType } from '../types/options.type.js';
import { User } from '../types/user.type.js';
import { Coordinates } from '../types/coordinates.type.js';

export function createOffer(offerData: string): Offer {
  const [
    name, description, createdDate,
    city, previewImg, images,
    isPremium, isFavourites, rating,
    livingPlace, roomsCount, peopleCount,
    price, optionsType, author,
    commentsCount, coordinates] = offerData.replace('\n', '').split('\t');

  return {
    name,
    description,
    createdDate: new Date(createdDate),
    city: city as CityType,
    previewImg,
    images: images.split(';'),
    isPremium: isPremium as unknown as boolean,
    isFavourites: isFavourites as unknown as boolean,
    rating: rating as unknown as 1 | 2 | 3 | 4 | 5,
    livingPlace: livingPlace as LivingPlaceType,
    roomsCount: roomsCount as unknown as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    peopleCount: peopleCount as unknown as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    price: Number.parseInt(price, 10),
    options: optionsType as OptionsType,
    author: author as unknown as User,
    commentsCount: Number.parseInt(commentsCount, 10),
    coordinates: coordinates.split(',') as unknown as Coordinates
  } as Offer;
}
