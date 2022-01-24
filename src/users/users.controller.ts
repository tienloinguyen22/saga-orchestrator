import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VerifyCustomerPayload } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private usersService: UsersService) {}

  @MessagePattern({ req: 'customers:verify' })
  verifyCustomer(data: VerifyCustomerPayload) {
    this.logger.debug(`Request "customers:verify" received`, data);
    return this.usersService.verifyCustomer(data);
  }
}
