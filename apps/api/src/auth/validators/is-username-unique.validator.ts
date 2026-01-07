import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@ValidatorConstraint({ name: 'IsUsernameUnique', async: true })
@Injectable()
export class IsUsernameUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(username: string): Promise<boolean> {
    const existingUsers = await this.userService.findByUsername(username);
    return existingUsers.length === 0;
  }

  defaultMessage(): string {
    return 'Username "$value" already exists';
  }
}

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameUniqueConstraint,
    });
  };
}
