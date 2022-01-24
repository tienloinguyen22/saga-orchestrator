import { IsNumber, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  DELIVERING = 'delivering',
  COMPLETED = 'completed',
}

export type Order = {
  _id: string;
  userId: string;
  restaurantId: string;
  items: string[];
  status: OrderStatus;
  total: number;
};

export class CreateOrderPayload {
  @IsString()
  restaurantId: string;

  @IsArray()
  @ArrayNotEmpty()
  items: string[];

  @IsNumber()
  total: number;
}
