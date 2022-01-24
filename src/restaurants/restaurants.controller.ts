import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTicketPayload, Ticket } from './restaurants.interface';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @MessagePattern({ req: 'tickets:create' })
  createOrder(@Body() payload: CreateTicketPayload): Promise<Ticket> {
    return this.restaurantsService.createTicket(payload);
  }
}
