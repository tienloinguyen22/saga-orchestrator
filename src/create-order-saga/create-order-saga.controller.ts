import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateOrderSagaService } from './create-order-saga.service';

@Controller('create-order-saga')
export class CreateOrderSagaController {
  constructor(private createOrderSagaService: CreateOrderSagaService) {}

  @Get('/healthcheck')
  healthCheck(): string {
    return this.createOrderSagaService.healthCheck();
  }

  @EventPattern('orders:created')
  async startCreateOrderSaga(data: any) {
    console.log(
      '🚀 ~ file: create-order-saga.controller.ts ~ line 16 ~ CreateOrderSagaController ~ handleUserCreated ~ data',
      data,
    );
  }
}
