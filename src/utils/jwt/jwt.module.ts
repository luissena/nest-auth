import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from './jwt.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
