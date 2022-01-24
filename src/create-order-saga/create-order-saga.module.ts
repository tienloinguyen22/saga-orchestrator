import { Module } from '@nestjs/common';
import { CreateOrderSagaController } from './create-order-saga.controller';
import { CreateOrderSagaService } from './create-order-saga.service';

@Module({
  imports: [],
  controllers: [CreateOrderSagaController],
  providers: [CreateOrderSagaService],
  exports: [],
})
export class CreateOrderSagaModule {}
