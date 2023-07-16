import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { JWTService } from 'src/utils/jwt/jwt.service';

type PayloadUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  iat: number;
  exp: number;
};
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = Reflect.getMetadata('role', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let payload: PayloadUser;
    try {
      payload = await this.jwtService.verifyToken(token);
      console.log(payload);
    } catch {
      throw new UnauthorizedException();
    }

    if (metadata) {
      if (payload.role === metadata) {
        return true;
      }
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
