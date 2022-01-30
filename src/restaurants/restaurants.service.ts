import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import {
  ApproveTicketPayload,
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

  async approveTicket(data: ApproveTicketPayload): Promise<Ticket> {
    const existedTicket = tickets.get(data.ticketId);
    if (!existedTicket) {
      throw new Error(`Ticket ${data.ticketId} not found`);
    }

    const updatedTicket = {
      ...existedTicket,
      status: TicketStatus.PREPARING,
    };
    tickets.set(existedTicket._id, updatedTicket);

    return updatedTicket;
  }
}
