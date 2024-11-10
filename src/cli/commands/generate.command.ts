import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import got from 'got';
import TSVOfferGenerator from '../../shared/modules/offer-generator/tsv-offer-generator.js';
import TsvFileWriter from '../../shared/modules/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  private initialData!: MockServerData;
  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.log(`Can't fetch data from ${url}`);
      return;
    }

    const offerGeneratorString = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created`);
  }
}
