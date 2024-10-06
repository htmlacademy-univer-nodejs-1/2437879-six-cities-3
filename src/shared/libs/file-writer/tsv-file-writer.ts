import { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { FileWriter } from './file-writer.interface.js';

export default class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      highWaterMark: 2 ** 16,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    const writeSuccess = this.stream.write(`${row}\n`);

    if (! writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }

    return Promise.resolve();
  }
}
