import { IsString } from 'class-validator';

export type User = {
  _id: string;
  verified: boolean;
};

export class VerifyCustomerPayload {
  @IsString()
  userId: string;
}
