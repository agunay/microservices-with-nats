import { Publisher, Subjects, TicketCreatedEvent } from '@agunay.tix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
