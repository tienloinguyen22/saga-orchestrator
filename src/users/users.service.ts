import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { User, VerifyCustomerPayload } from './users.interface';

const users = new Map<User['_id'], User>();

@Injectable()
export class UsersService {
  async verifyCustomer(data: VerifyCustomerPayload) {
    const existedUser = users.get(data.userId);
    if (existedUser) {
      return existedUser;
    }

    const verified = [true, false];
    const user = {
      _id: uuid.v4(),
      verified: verified[Math.floor(Math.random() * verified.length)],
    };
    users.set(user._id, user);
    return user;
  }
}
