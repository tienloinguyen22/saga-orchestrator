import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { AuthorizeCardPayload, Card } from './payments.interface';

const cards = new Map<Card['_id'], Card>();

@Injectable()
export class PaymentsService {
  async authorizeCard(data: AuthorizeCardPayload) {
    const existedCard = cards.get(data.cardId);
    if (existedCard) {
      if (existedCard.balance > data.total) {
        cards.set(data.cardId, {
          ...existedCard,
          balance: existedCard.balance - data.total,
        });

        return {
          cardId: data.cardId,
          authorized: true,
        };
      } else {
        return {
          cardId: data.cardId,
          authorized: false,
        };
      }
    }

    const newCard = {
      _id: uuid.v4(),
      balance: Math.floor(Math.random() * 1000) + 1,
    };
    if (newCard.balance > data.total) {
      cards.set(data.cardId, {
        ...newCard,
        balance: newCard.balance - data.total,
      });

      return {
        cardId: data.cardId,
        authorized: true,
      };
    } else {
      cards.set(newCard._id, newCard);

      return {
        cardId: data.cardId,
        authorized: false,
      };
    }
  }
}
