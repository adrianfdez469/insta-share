import { Document } from "mongoose";
import { User } from "@cuban-eng/common";

export interface IUser  extends Omit<User, 'id' >, Document {}