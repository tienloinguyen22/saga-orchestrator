import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderSagaService {
  healthCheck(): string {
    return 'Whats up, Its "create-order-saga"';
  }
}
