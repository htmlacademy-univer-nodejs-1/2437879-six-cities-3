import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { CityType } from '../../../types/city.type.js';
import { LivingPlaceType } from '../../../types/living-place.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../../helpers/random.js';

const MIN_PRICE = 500;
const MAX_PRICE = 200000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItem<string>(this.mockData.description);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem([CityType.Amsterdam, CityType.Cologne, CityType.Brussels, CityType.Paris, CityType.Hamburg, CityType.Dusseldorf]);
    const rating = getRandomItem([1, 2, 3, 4, 5]);
    const livingPlace = getRandomItem([LivingPlaceType.House, LivingPlaceType.Hotel, LivingPlaceType.Room, LivingPlaceType.Apartment]);
    const isPremium = getRandomItem([true, false]);
    const isFavourites = getRandomItem([true, false]);
    const roomsCount = getRandomItem([1, 2, 3, 4, 5, 6, 7, 8]);
    const peopleCount = getRandomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const previewImg = getRandomItem<string>(this.mockData.previewImg);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const images = getRandomItem<string>(this.mockData.images);
    const options = getRandomItems<string>(this.mockData.options);
    const author = getRandomItem<string>(this.mockData.author);
    const commentsCount = getRandomItem<string>(this.mockData.commentsCount);
    const coordinates = getRandomItem<string>(this.mockData.coordinates);

    return [
      name, description, createdDate,
      city, previewImg, images,
      isPremium, isFavourites, rating,
      livingPlace, roomsCount, peopleCount,
      price, options, author, commentsCount, coordinates
    ].join('\t');
  }
}
