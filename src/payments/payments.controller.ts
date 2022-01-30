import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthorizeCardPayload } from './payments.interface';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(private paymentsService: PaymentsService) {}

  @MessagePattern({ req: 'payment:authorize-card' })
  authorizeCard(data: AuthorizeCardPayload) {
    this.logger.debug(`Request "payment:authorize-card" received`, data);
    return this.paymentsService.authorizeCard(data);
  }
}
