import { Document } from "mongoose";
import { File } from "../graphql";

export interface IFile extends Omit<File, 'id' >, Document {}