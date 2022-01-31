import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateOrderSagaController } from './create-order-saga.controller';
import { CreateOrderSagaService } from './create-order-saga.service';

@Module({
  imports: [
    ClientsModule.register([{ name: 'rmq', transport: Transport.RMQ }]),
  ],
  controllers: [CreateOrderSagaController],
  providers: [CreateOrderSagaService],
  exports: [],
})
export class CreateOrderSagaModule {}
