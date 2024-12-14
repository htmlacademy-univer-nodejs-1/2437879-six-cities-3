import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer-generator/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    min: [5, 'Min length for text is 5'],
    max: [1024, 'Min length for text is 1024'],
  })
  public text!: string;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({required: true})
  public createdDate!: Date;

  @prop({required: true})
  public rating!: number;
}

export const CommentModel = getModelForClass(CommentEntity);
