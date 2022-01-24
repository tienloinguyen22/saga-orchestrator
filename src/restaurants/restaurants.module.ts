import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [],
})
export class RestaurantsModule {}
