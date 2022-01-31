import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as uuid from 'uuid';
import {
  ChangeOrderStatusPayload,
  CreateOrderPayload,
  Order,
  OrderStatus,
} from './orders.interface';

const orders = new Map<Order['_id'], Order>();

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(@Inject('rmq') private rmqClientProxy: ClientProxy) {}

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
    this.rmqClientProxy.emit('orders:created', newOrder);

    return newOrder;
  }

  async approveOrder(payload: ChangeOrderStatusPayload): Promise<Order> {
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

  async rejectOrder(payload: ChangeOrderStatusPayload): Promise<Order> {
    const existedOrder = orders.get(payload.orderId);
    if (!existedOrder) {
      throw new Error(`Order ${payload.orderId} not found`);
    }

    const updatedOrder = {
      ...existedOrder,
      status: OrderStatus.REJECTED,
    };
    orders.set(payload.orderId, updatedOrder);

    this.logger.debug(
      `Reject order ${payload.orderId} with msg: ${
        payload.rejectMsg || 'Unknown'
      }`,
    );

    return updatedOrder;
  }
}
