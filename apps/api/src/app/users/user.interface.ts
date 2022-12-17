import { Document } from "mongoose";
import { User } from "../graphql";

export interface IUser  extends Omit<User, 'id' >, Document {}