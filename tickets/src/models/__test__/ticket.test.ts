import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
  const ticket = Ticket.build({
    title: 'gig',
    price: 99,
    userId: '123',
  });

  await ticket.save();

  const ticketInstance1 = await Ticket.findById(ticket.id);
  const ticketInstance2 = await Ticket.findById(ticket.id);

  ticketInstance1!.set({ price: 10 });
  ticketInstance2!.set({ price: 15 });

  await ticketInstance1!.save();

  try {
    // This will fail due to wrong version
    await ticketInstance2!.save();
  } catch (e) {
    return;
  }

  throw new Error('Should not reach this point.');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'gig',
    price: 99,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
