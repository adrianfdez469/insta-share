import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL } from '../../constants';
import { IUser } from './user.interface';
import { LoginUserData } from '@cuban-eng/common';

@Injectable()
export class UsersService {

  constructor(@Inject(USER_MODEL) private userModel: Model<IUser>){}
  
  async list(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async findOneById(id: string): Promise<IUser> {
    return this.userModel.findById(id);
  }
  
  // TODO: validate unique email
  // TODO: validate don't return password field
  async createUser(email: string, password: string): Promise<IUser> {
    const encryptedPass = bcrypt.hashSync(password, bcrypt.genSaltSync());
    const user = new this.userModel({email, password: encryptedPass});
    
    await user.save();
    return user;
  }

  async deleteUser(id: string): Promise<IUser> {
    return await this.userModel.findByIdAndRemove(id).exec();
  }

  async findOne(email: string): Promise<IUser> {
    return await this.userModel.findOne({email}).select('password').exec();
  }

  async validateUser(email: string, pass: string): Promise<Partial<IUser>> {
    const user = await this.findOne(email);
    if(user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async generateUserToken(email: string, password: string): Promise<LoginUserData> {

    const user = await this.validateUser(email, password);

    if(user ) {
      console.log(user);
      
      const JWT_SECRET = process.env.NEST_JWT_SECRET;
      
      const issuedAt = new Date().getTime();
      const expirationDate = new Date(new Date(issuedAt).getTime() + 60 * 60 * 24 * 1000).getTime();

      const token = jwt.sign({
        email: user.email,
        sub: user.id,
        iat: issuedAt,
        exp: expirationDate
      }, JWT_SECRET)
      
      return {
        id: user.id,
        email, 
        token,
        exp: expirationDate
      }

    } else {
      // TODO: wrong credentials
      throw Error('WRONG CREDENTIALS')
    }
  }

  
}

