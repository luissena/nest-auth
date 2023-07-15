import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  private secret: string = process.env.JWT_SECRET;

  constructor(private readonly jwtService: JwtService) {}

  public async generateToken(payload: any) {
    return this.jwtService.signAsync(payload, { secret: this.secret });
  }

  public async verifyToken(token: string, options: any = {}) {
    return this.jwtService.verifyAsync(token, {
      secret: this.secret,
      ...options,
    });
  }
}
