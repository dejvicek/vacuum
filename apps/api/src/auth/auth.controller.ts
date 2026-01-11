import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() signupRequestDto: SignupRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authService.signup(signupRequestDto);
  }

  @Post('/signin')
  async signin(
    @Body() authRequestDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authService.signin(authRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return {
      message: 'User profile data',
      user: req.user,
    };
  }
}
