import { FileReader } from './index.js';
import { readFileSync } from 'node:fs';
import { Offer } from '../../../types/offer.type.js';
import { CityType } from '../../../types/city.type.js';
import { LivingPlaceType } from '../../../types/living-place.type.js';
import { OptionsType } from '../../../types/options.type.js';
import { User } from '../../../types/user.type.js';
import { Coordinates } from '../../../types/coordinates.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name, description, createdDate, city, previewImg, images, isPremium, isFavourites, rating, livingPlace, roomsCount, peopleCount, price, options, author, commentsCount, coordinates]) =>
        ({
          name: name,
          description: description,
          createdDate: new Date(createdDate),
          city: city as CityType,
          previewImg: previewImg,
          images: images.split(';'),
          isPremium: isPremium as unknown as boolean,
          isFavourites: isFavourites as unknown as boolean,
          rating: rating as unknown as 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
                2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
                3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
                4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
                5,
          livingPlace: livingPlace as LivingPlaceType,
          roomsCount: roomsCount as unknown as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
          peopleCount: peopleCount as unknown as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
          price: Number.parseInt(price, 10),
          options: options as OptionsType,
          author: author as unknown as User,
          commentsCount: Number.parseInt(commentsCount, 10),
          coordinates: coordinates.split(',') as unknown as Coordinates,
        }));
  }
}
