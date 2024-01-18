import { agent as request } from 'supertest';
import httpStatus from 'http-status';
import app from '@app';
import User from '@models/user.model';
import { hashSync } from 'bcrypt';

const userMock = {
  username: 'admin',
  password: 'thePassword',
};

describe('User API', () => {

  jest.spyOn(User, 'findOne').mockResolvedValue({
    id: 1,
    username: 'admin',
    password: hashSync('thePassword', 10),
  } as User);

  describe('User login [POST] /api/login', () => {
    test('Should return 200 OK', async () => {
      await request(app)
        .post('/api/login')
        .send(userMock)
        .expect(httpStatus.OK);
    });

    test('Should return 400 Bad Request', async () => {
      await request(app)
        .post('/api/login')
        .send({ username: 'admin' })
        .expect(httpStatus.BAD_REQUEST);
    });

    test('Should return 401 Unauthorized', async () => {
      await request(app)
        .post('/api/login')
        .send({ username: 'admin', password: 'wrongPassword' })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
