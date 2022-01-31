import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  UpdateTicketStatusPayload,
  CreateTicketPayload,
  Ticket,
} from './restaurants.interface';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @MessagePattern({ req: 'tickets:create' })
  createTicket(@Body() payload: CreateTicketPayload): Promise<Ticket> {
    return this.restaurantsService.createTicket(payload);
  }

  @MessagePattern({ req: 'tickets:approve' })
  approveTicket(@Body() payload: UpdateTicketStatusPayload): Promise<Ticket> {
    return this.restaurantsService.approveTicket(payload);
  }

  @MessagePattern({ req: 'tickets:reject' })
  rejectTicket(@Body() payload: UpdateTicketStatusPayload): Promise<Ticket> {
    return this.restaurantsService.rejectTicket(payload);
  }
}
