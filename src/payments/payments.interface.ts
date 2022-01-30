import { IsNumber, IsString } from 'class-validator';

export interface Card {
  _id: string;
  balance: number;
}

export class AuthorizeCardPayload {
  @IsString()
  cardId: string;

  @IsNumber()
  total: number;
}
