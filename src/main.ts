import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders-service/orders.module';

async function bootstrap() {
  // Orders
  const ordersServer = await NestFactory.create(OrdersModule);
  ordersServer.connectMicroservice({
    transport: Transport.RMQ,
  });
  await ordersServer.startAllMicroservices();
  await ordersServer.listen(3000);
}

bootstrap();
