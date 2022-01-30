import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ApproveTicketPayload,
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
  approveTicket(@Body() payload: ApproveTicketPayload): Promise<Ticket> {
    return this.restaurantsService.approveTicket(payload);
  }
}
