import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(payload: AuthRequestDto): Promise<AuthResponseDto> {
    const existingUser = await this.userService.findByUsername(
      payload.username,
    );

    if (existingUser.length > 0) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const [createdUser] = await this.userService.createUser(
      payload.username,
      hashedPassword,
    );

    const accessToken = this.generateAccessToken(createdUser);

    return {
      accessToken,
      user: { id: createdUser.id, username: createdUser.username },
    };
  }

  async signin(payload: AuthRequestDto): Promise<AuthResponseDto> {
    const users = await this.userService.findByUsername(payload.username);

    if (users.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);

    return {
      accessToken,
      user: { id: user.id, username: user.username },
    };
  }

  private generateAccessToken(user: { id: number; username: string }): string {
    const payload: JwtPayloadDto = {
      sub: user.id,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }
}
