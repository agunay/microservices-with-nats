import { Publisher, Subjects, TicketUpdatedEvent } from '@agunay.tix/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
