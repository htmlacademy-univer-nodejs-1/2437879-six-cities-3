import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/modules/file-reader/index.js';
import { createOffer } from '../../helpers/offers.js';
import chalk from 'chalk';
import ConsoleLoggerService from '../../shared/modules/logger/console.service.js';
import OfferService from '../../shared/modules/offer-generator/offer.service.js';
import UserService from '../../shared/modules/user/user.service.js';
import MongoClientService from '../../shared/modules/database-client/mongo-client.service.js';
import { OfferModel } from '../../shared/modules/offer-generator/offer.entity.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { DatabaseClientInterface } from '../../shared/modules/database-client/database-client.interface.js';
import { LoggerInterface } from '../../shared/modules/logger/logger.interface.js';
import { OfferServiceInterface } from '../../shared/modules/offer-generator/offer-service.interface.js';
import { UserServiceInterface } from '../../shared/modules/user/user-service.interface.js';
import { Offer } from '../../types/offer.type.js';
import { getMongoURI } from '../../helpers/db.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = 'pass';

export class ImportCommand implements Command {
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      author: user
    });
  }

  public getName(): string {
    return '--import';
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);

    resolve();
  }

  private onComplete(count: number) {
    this.logger.info(`${count} rows imported.`);
    this.databaseService.disconnect().then((value) => {
      console.log(value);
    });
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
