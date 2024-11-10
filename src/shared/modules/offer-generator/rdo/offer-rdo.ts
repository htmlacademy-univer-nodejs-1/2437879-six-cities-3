import { Expose } from 'class-transformer';
import { CityType } from '../../../../types/city.type.js';
import { LivingPlaceType } from '../../../../types/living-place.type.js';
import { OptionsType } from '../../../../types/options.type.js';
import { User } from '../../../../types/user.type.js';
import { Coordinates } from '../../../../types/coordinates.type.js';

export class OfferRdo {
    @Expose()
  public name!: string;

    @Expose()
    public description!: string;

    @Expose()
    public createdDate!: Date;

    @Expose()
    public city!: CityType;

    @Expose()
    public previewImg!: string;

    @Expose()
    public images!: string[];

    @Expose()
    public isPremium!: boolean;

    @Expose()
    public isFavourites!: boolean;

    @Expose()
    public rating!: 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
        2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
        3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
        4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
        5;

    @Expose()
    public livingPlace!: LivingPlaceType;

    @Expose()
    public roomsCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    @Expose()
    public peopleCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

    @Expose()
    public price!: number;

    @Expose()
    public options!: OptionsType;

    @Expose()
    public author!: User;

    @Expose()
    public coordinates!: Coordinates;
}
