import request from 'supertest';
import { app } from '../../app';

it('retuns a 201 on successful signup', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(201);
});

it('retuns a 400 with an invalid email', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@testcom',
      password: '123456',
    })
    .expect(400);
});

it('retuns a 400 with an invalid password', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123',
    })
    .expect(400);
});

it('retuns a 400 with an missing email & password', async () => {
  return await request(app).post('/api/users/signup').send().expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'newtest123@test.com',
      password: '123456',
    })
    .expect(201);
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'newtest123@test.com',
      password: '123456',
    })
    .expect(400);
});

it('sets a cookier after successful signup', async () => {
  const respose = await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: '123456',
  });
  expect(respose.get('Set-Cookie')).toBeDefined();
});
