import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTService } from 'src/utils/jwt/jwt.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JWTService,
  ) {}

  async login(loginDto: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect!');
    }

    const passwordMatch = await compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email or password incorrect!');
    }

    const token = await this.jwtService.generateToken(user);
    console.log(user);
    return { token };
  }
}
