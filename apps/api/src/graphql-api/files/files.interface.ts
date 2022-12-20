import { Document } from "mongoose";
import { File } from "@cuban-eng/common";

export interface IFile extends Omit<File, 'id' >, Document {}