import request from 'supertest';
import { app } from '../../app';

it('clears cookie after signout', async () => {
  await global.signin();
  const respose = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
  expect(respose.get('Set-Cookie')).toEqual([
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
  ]);
});
