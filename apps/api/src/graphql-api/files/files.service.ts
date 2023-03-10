import { Inject, Injectable } from "@nestjs/common";
import { FILE_MODEL } from "../../constants";
import { Model } from "mongoose";
import { IFile } from "./files.interface";
import { File } from "@cuban-eng/common";

@Injectable()
export class FilesService {

  constructor(@Inject(FILE_MODEL) private fileModel: Model<IFile>){}

  async findAll(userId: string): Promise<IFile[]> {
    const files = await this.fileModel.find({ user: userId});
    return files;
  }

  async saveFile(name, status, size, url, userId): Promise<IFile> {
    const file = new this.fileModel({name, size, url, status, user: userId});
    await file.save();
    return file;
  }

  async updateByUrl(url: string, data: Partial<File>): Promise<IFile> {
    const file = await this.fileModel.findOne({url: url});
    Object.assign(file, data);
    await file.save();
    return file;
  }

  async update(id:string, data: Partial<File> ): Promise<IFile> {
    const file = await this.fileModel.findById(id)
    Object.assign(file, data);
    await file.save();
    return file;
  }

  async deleteFile(id): Promise<IFile> {
    return await this.fileModel.findByIdAndRemove(id).exec();
  }
  
  async deleteAllFile(): Promise<void> {
    await this.fileModel.find().deleteMany().exec();
  }
}