import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to compressor!' };
  }
  async getFile() {
    return
  }
  async compressFile(file: any) {
    return
  }
  async saveFile(file: any) {
    return
  }
}
