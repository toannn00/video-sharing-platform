import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  const mockUser = {
    email: 'test@example.com',
    password: 'test1234',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    connection = moduleFixture.get(getConnectionToken());

    await connection.collection('users').deleteOne({ email: mockUser.email });
    await app.init();
  });

  afterEach(async () => {
    await connection.collection('users').deleteOne({ email: mockUser.email });
    await app.close();
  });

  describe('/auth/login (POST)', () => {
    it('should create a new user when email does not exist', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(mockUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('token');
          expect(typeof res.body.token).toBe('string');
        });
    });

    it('should login existing user with correct credentials', async () => {
      await request(app.getHttpServer()).post('/auth/login').send(mockUser);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(mockUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('token');
          expect(typeof res.body.token).toBe('string');
        });
    });

    it('should fail with invalid email format', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid-email',
          password: 'test1234',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('Enter valid email');
        });
    });

    it('should fail with short password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: '123',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain(
            'password must be longer than or equal to 8 characters',
          );
        });
    });

    it('should fail with missing email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          password: 'test1234',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('email should not be empty');
        });
    });

    it('should fail with missing password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('password should not be empty');
        });
    });

    it('should fail with wrong password for existing user', async () => {
      await request(app.getHttpServer()).post('/auth/login').send(mockUser);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: mockUser.email,
          password: 'wrongpassword',
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('Invalid email or password');
        });
    });
  });
});
