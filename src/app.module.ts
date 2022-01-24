import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { CreateOrderSagaModule } from './create-order-saga/create-order-saga.module';
import { OrdersModule } from './orders-service/orders.module';

@Module({
  imports: [
    ClientsModule.register([{ name: 'PUB_SUB', transport: Transport.RMQ }]),
    OrdersModule,
    CreateOrderSagaModule,
  ],
  controllers: [],
  providers: [AppController],
  exports: [],
})
export class AppModule {}
