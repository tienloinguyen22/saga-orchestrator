import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import {
  CreateTicketPayload,
  Ticket,
  TicketStatus,
} from './restaurants.interface';

const tickets = new Map<Ticket['_id'], Ticket>();

@Injectable()
export class RestaurantsService {
  async createTicket(payload: CreateTicketPayload): Promise<Ticket> {
    const newTicket = {
      _id: uuid.v4(),
      status: TicketStatus.PENDING,
      ...payload,
    };
    tickets.set(newTicket._id, newTicket);
    return newTicket;
  }
}
