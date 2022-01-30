import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import * as uuid from 'uuid';
import {
  ApproveOrderPayload,
  CreateOrderPayload,
  Order,
} from './orders.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() payload: CreateOrderPayload): Promise<Order> {
    const userId = uuid.v4();
    return this.ordersService.createOrder(userId, payload);
  }

  @MessagePattern({ req: 'orders:approve' })
  approveOrder(@Body() payload: ApproveOrderPayload): Promise<Order> {
    return this.ordersService.approveOrder(payload);
  }
}
