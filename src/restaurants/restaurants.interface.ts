import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export enum TicketStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  FINISHED = 'finished',
}

export type Ticket = {
  _id: string;
  restaurantId: string;
  items: string[];
  status: TicketStatus;
};

export class CreateTicketPayload {
  @IsString()
  restaurantId: string;

  @IsArray()
  @ArrayNotEmpty()
  items: string[];
}

export class ApproveTicketPayload {
  @IsString()
  ticketId: string;
}
