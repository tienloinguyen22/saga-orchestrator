import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Order, OrderStatus } from './orders.interface';

const orders = new Map<Order['_id'], Order>();

@Injectable()
export class OrdersService {
  healthCheck(): string {
    return 'Whats up, Its "orders"';
  }

  async createOrder(
    userId: string,
    payload: Omit<Order, '_id' | 'userId' | 'status'>,
  ): Promise<Order> {
    const newOrder = {
      _id: uuid.v4(),
      status: OrderStatus.PENDING,
      userId,
      ...payload,
    };

    orders.set(newOrder._id, newOrder);

    return newOrder;
  }
}
