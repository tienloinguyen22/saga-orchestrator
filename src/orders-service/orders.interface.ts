import { IsNumber, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  DELIVERING = 'delivering',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export type Order = {
  _id: string;
  userId: string;
  restaurantId: string;
  items: string[];
  status: OrderStatus;
  total: number;
  cardId: string;
};

export class CreateOrderPayload {
  @IsString()
  restaurantId: string;

  @IsArray()
  @ArrayNotEmpty()
  items: string[];

  @IsNumber()
  total: number;

  @IsString()
  cardId: string;
}

export class ChangeOrderStatusPayload {
  @IsString()
  orderId: string;

  @IsString()
  rejectMsg?: string;
}
