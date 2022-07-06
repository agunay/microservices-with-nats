import request from 'supertest';
import { app } from '../../app';

it('retuns a 201 on successful signin', async () => {
  await global.signin();
  return await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);
});

it('retuns a 400 with an invalid email', async () => {
  return await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@testcom',
      password: '123456',
    })
    .expect(400);
});

it('retuns a 400 with an invalid password', async () => {
  return await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123',
    })
    .expect(400);
});

it('responds with a cookie after successful signin', async () => {
  await global.signin();
  const respose = await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: '123456',
  });
  expect(respose.get('Set-Cookie')).toBeDefined();
});
