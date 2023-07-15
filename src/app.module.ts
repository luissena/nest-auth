import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { JWTModule } from './utils/jwt/jwt.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, JWTModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
