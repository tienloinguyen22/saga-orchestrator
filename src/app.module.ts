import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { CreateOrderSagaModule } from './create-order-saga/create-order-saga.module';
import { OrdersModule } from './orders-service/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ClientsModule.register([{ name: 'rmq', transport: Transport.RMQ }]),
    OrdersModule,
    CreateOrderSagaModule,
    UsersModule,
    RestaurantsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
