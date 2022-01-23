import { Body, Controller, Get, Post } from '@nestjs/common';
import * as uuid from 'uuid';
import { Order } from './orders.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/healthcheck')
  healthCheck(): string {
    return this.ordersService.healthCheck();
  }

  @Post()
  createOrder(
    @Body() payload: Omit<Order, '_id' | 'userId' | 'status'>,
  ): Promise<Order> {
    const userId = uuid.v4();
    return this.ordersService.createOrder(userId, payload);
  }
}
