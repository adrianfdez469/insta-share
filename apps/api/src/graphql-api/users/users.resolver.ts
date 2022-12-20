import { Resolver, ResolveField, Query, Args, Parent, Mutation } from "@nestjs/graphql";
import { FilesService } from "../files/files.service";
import { CreateUserResponse, DeleteUserResponse, LoginUserResponse, User } from "../graphql";
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
  ) {}

  @Query('user')
  async getUser(@Args('id') id: string) {
    const user = await this.usersService.findOneById(id);
    return user; 
  }

  @Query()
  async getUsers() {
    return await this.usersService.list();
  }


  @ResolveField('files')
  async getFiles(@Parent() user) {
    const { id } = user;
    return this.filesService.findAll(id);
  }

  @Mutation()
  async createUser(@Args('email') email: string, @Args('password') pass: string): Promise<CreateUserResponse> {
    
    const createdUser = await this.usersService.createUser(email, pass);
    
    return {
      code: '201',
      message: 'USER CREATED',
      success: true,
      data: createdUser as User
    }
  }

  @Mutation()
  async deleteUser(@Args('id') id: string): Promise<DeleteUserResponse> {
    try {
      const userDeleted = await this.usersService.deleteUser(id);
      if(userDeleted){
        return { code: '200', message: 'USER DELETED', success: true }  
      } else {
        return { code: '404', message: 'USER NOT FOUND', success: false }  
      }
    } catch (error) {
      return { code: '500', message: 'ERROR', success: false }  
    }
  }
  
  @Mutation()
  async loginUser(@Args('email') email: string, @Args('password') password: string): Promise<LoginUserResponse> {
    try {
      const data = await this.usersService.generateUserToken(email, password);
      return {
        code: '200',
        message: 'TOKEN GENERATED',
        success: true,
        data
      }
    } catch (error) {
      if(error.message === 'WRONG CREDENTIALS'){
        return {
          code: '400',
          message: error.message,
          success: false
        }
      }
      console.log(error);
      return {
        code: '500',
        message: 'ERROR',
        success: false
      }
    }
  }
}