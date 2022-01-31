import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Order } from '../orders-service/orders.interface';
import { Saga } from './saga';

@Injectable()
export class CreateOrderSagaService {
  constructor(@Inject('rmq') private rmqClientProxy: ClientProxy) {}

  async runCreateOrderSaga(data: Order) {
    const createOrderSaga = new Saga<{ order: Order; ticketId?: string }>(
      'CREATE_ORDER',
      { order: data },
    );
    await createOrderSaga
      .step(async () => {
        const verifyUserResponse = await firstValueFrom(
          this.rmqClientProxy.send<{ verified: boolean }>(
            { req: 'customers:verify' },
            { userId: data.userId },
          ),
        );
        if (!verifyUserResponse.verified) {
          throw new Error('Consumer isnt verified');
        }
      })
      .withCommpensate(async () => {
        this.rmqClientProxy.send(
          { req: 'orders:reject' },
          { orderId: data._id, rejectMsg: 'Verify consumer failed' },
        );
      })
      .step(async () => {
        const createTicketResponse = await firstValueFrom(
          this.rmqClientProxy.send<{ _id: string }>(
            { req: 'tickets:create' },
            { restaurantId: data.restaurantId, items: data.items },
          ),
        );
        createOrderSaga.setParam('ticketId', createTicketResponse._id);
      })
      .step(async () => {
        const authorizeCardResponse = await firstValueFrom(
          this.rmqClientProxy.send<{ authorized: boolean }>(
            { req: 'payment:authorize-card' },
            { cardId: data.cardId, total: data.total },
          ),
        );
        if (!authorizeCardResponse.authorized) {
          throw new Error('Cant authorize card');
        }
      })
      .withCommpensate(async () => {
        // reject ticket
        this.rmqClientProxy.send(
          { req: 'tickets:reject' },
          { ticketId: createOrderSaga.getParam('ticketId') },
        );

        // reject order
        this.rmqClientProxy.send(
          { req: 'orders:reject' },
          { orderId: data._id, rejectMsg: 'Verify consumer failed' },
        );
      })
      .step(async () => {
        this.rmqClientProxy.send(
          { req: 'tickets:approve' },
          { ticketId: createOrderSaga.getParam('ticketId') },
        );
      })
      .step(async () => {
        this.rmqClientProxy.send(
          { req: 'orders:approve' },
          { orderId: data._id },
        );
      })
      .start();
  }
}
