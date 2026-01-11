import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { IsUsernameUniqueConstraint } from './validators/is-username-unique.validator';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: AuthModule.getJwtSecret(),
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, IsUsernameUniqueConstraint],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {
  static getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.trim() === '') {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    return secret;
  }
}
