import { Publisher, OrderCreatedEvent, Subjects } from '@agunay.tix/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
