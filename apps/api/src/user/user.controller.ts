import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './users.types';

@Controller('public/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users' })
  async getPlayers(): Promise<User[]> {
    this.logger.log('Fetching all players');
    return this.userService.findAllUsers();
  }
}
