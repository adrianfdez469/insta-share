import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'; 
import { GqlExecutionContext } from '@nestjs/graphql';

const verifyToken = (authorizationString: string) => {
  const [tokenType, token] = authorizationString.split(' ')
  if(tokenType === 'Bearer' && token) {
    const JWT_SECRET = process.env.NEST_JWT_SECRET;
    const data = jwt.verify(token, JWT_SECRET);
    return data;
  }
  return null;
}

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    try {
      if(request && request.headers.authorization) {
        const data = verifyToken(request.headers.authorization);
        if(data) {
          return true
        }
      }
      return false;
    }
    catch(err) {
      return false;
    }
  }

  
}

@Injectable()
export class AuthGuardGraphQl implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const ctx = GqlExecutionContext.create(context);
    
    try {
      const gqlContext = ctx.getContext()
        if(gqlContext && gqlContext.req && gqlContext.req.headers && gqlContext.req.headers.authorization) {
          const authString = gqlContext.req.headers.authorization;
          
          const data = verifyToken(authString);
          if(data) {
            return true
          } 
        }
      return false;
    }
    catch(err) {
      return false;
    }
  }
}

