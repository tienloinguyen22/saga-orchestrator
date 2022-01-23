import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    ClientsModule.register([{ name: 'PUB_SUB', transport: Transport.RMQ }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [],
})
export class OrdersModule {}
