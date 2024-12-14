import { User } from '../../../types/user.type.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { createSHA256 } from '../../../helpers/crypto.js';
import { UserTypeEnum } from '../../../types/user-type.enum.js';
import { OfferEntity } from '../offer-generator/offer.entity.js';

const { prop, modelOptions } = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({unique: true, required: true})
  public email: string;

  @prop({required: true})
  public name: string;

  @prop({required: false, default: 'default-avatar.jpg'})
  public avatarPath?: string;

  @prop({required: true, default: ''})
  public password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);

    return hashPassword === this.password;
  }

  @prop({required: true, enum: UserTypeEnum})
  public userType: UserTypeEnum;

  @prop({required: true, ref: 'OfferEntity', default: []})
  public favoriteOffers!: Ref<OfferEntity>[];
}

export const UserModel = getModelForClass(UserEntity);
