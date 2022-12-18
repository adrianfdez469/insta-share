import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpressService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  async upload(file: any) {
    console.log(file);
  }
}
