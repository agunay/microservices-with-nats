import { Publisher, OrderCancelledEvent, Subjects } from '@agunay.tix/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
