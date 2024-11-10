import 'reflect-metadata';
import Application from './app/rest.js';
import { Container } from 'inversify';
import { AppComponent } from './types/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createOfferContainer } from './shared/modules/offer-generator/offer.container.js';
import { createCommentContainer } from './shared/modules/comment/comment.container.js';


async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );

  const application = mainContainer.get<Application>(AppComponent.Application);

  await application.init();
}

bootstrap().then((value) => console.log(value));
