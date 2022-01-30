import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as uuid from 'uuid';
import {
  ApproveOrderPayload,
  CreateOrderPayload,
  Order,
  OrderStatus,
} from './orders.interface';

const orders = new Map<Order['_id'], Order>();

@Injectable()
export class OrdersService {
  constructor(@Inject('PUB_SUB') private pubsub: ClientProxy) {}

  async createOrder(
    userId: string,
    payload: CreateOrderPayload,
  ): Promise<Order> {
    const newOrder = {
      _id: uuid.v4(),
      status: OrderStatus.PENDING,
      userId,
      ...payload,
    };

    orders.set(newOrder._id, newOrder);
    this.pubsub.emit('orders:created', newOrder);

    return newOrder;
  }

  async approveOrder(payload: ApproveOrderPayload): Promise<Order> {
    const existedOrder = orders.get(payload.orderId);
    if (!existedOrder) {
      throw new Error(`Order ${payload.orderId} not found`);
    }

    const updatedOrder = {
      ...existedOrder,
      status: OrderStatus.PREPARING,
    };
    orders.set(payload.orderId, updatedOrder);

    return updatedOrder;
  }
}
