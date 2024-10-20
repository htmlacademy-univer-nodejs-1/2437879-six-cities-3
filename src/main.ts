import 'reflect-metadata';
import Application from './app/rest.js';
import { Container } from 'inversify';
import { AppComponent } from './types/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './shared/libs/user/user.container.js';
import { createOfferContainer } from './shared/libs/offer-generator/offer.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const application = mainContainer.get<Application>(AppComponent.Application);

  await application.init();
}

bootstrap().then((value) => console.log(value));
