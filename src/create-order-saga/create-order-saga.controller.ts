import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Order } from '../orders-service/orders.interface';
import { CreateOrderSagaService } from './create-order-saga.service';

@Controller('create-order-saga')
export class CreateOrderSagaController {
  private readonly logger = new Logger(CreateOrderSagaController.name);

  constructor(private createOrderSagaService: CreateOrderSagaService) {}

  @Get('/healthcheck')
  healthCheck(): string {
    return this.createOrderSagaService.healthCheck();
  }

  @EventPattern('orders:created')
  async startCreateOrderSaga(data: Order) {
    this.logger.debug(`Event "orders:created" received`, data);
  }
}
