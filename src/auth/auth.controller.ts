import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @SetMetadata('role', 'admin')
  @UseGuards(AuthGuard)
  @Get('safe')
  SafeToUse(@Req() req) {
    return 'Safe to use';
  }
}
