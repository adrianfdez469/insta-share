import { Injectable } from '@nestjs/common';
import * as JSZip from 'jszip'
import * as fs from 'fs';



@Injectable()
export class AppService {
  
  getData(): { message: string } {
    return { message: 'Welcome to compressor!' };
  }

  
  async compressFile(origin_dir: string, destination_dir: string, file_name: string): Promise<{name: string, size: number}> {
    const zip = new JSZip();

    const originalFilePath = `${origin_dir}/${file_name}`;
    const newZipFileName = file_name.split('.')[0];
    const destinationZipPath = `${destination_dir}/${newZipFileName}.zip`;
    

    const fileData = await fs.readFileSync(originalFilePath);
    zip.file(file_name, fileData);

    const zipFilePromise = new Promise<void>((resolve, reject) => {
      zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true, compression: 'DEFLATE', compressionOptions: {level: 9} })
          .pipe(fs.createWriteStream(destinationZipPath))
          .on('finish', function () { resolve(); })
          .on('error', function(err) { reject(err); })
      })
      .then(() => {
        fs.rmSync(originalFilePath);
        return;
      })
      .then(() => {
        const stats = fs.statSync(destinationZipPath)
        return {
          name: destinationZipPath,
          size: stats.size
        }
      })
    
      return zipFilePromise;

  }
}
