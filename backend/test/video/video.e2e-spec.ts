import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('VideoController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  let authToken: string;

  const mockUser = {
    email: 'test2@example.com',
    password: 'test1234',
  };

  const mockVideo = {
    title: 'Test Video',
    description: 'Test Description',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    connection = moduleFixture.get(getConnectionToken());

    await connection.collection('users').deleteOne({ email: mockUser.email });
    await connection.collection('videos').deleteOne({ title: mockVideo.title });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockUser);
    authToken = loginResponse.body.token;
  });

  afterEach(async () => {
    await connection.collection('users').deleteOne({ email: mockUser.email });
    await connection.collection('videos').deleteOne({ title: mockVideo.title });
    await app.close();
  });

  // Only for local
  //   describe('/video (GET)', () => {
  //     it('should return an empty array when no videos exist', () => {
  //       return request(app.getHttpServer()).get('/video').expect(200).expect([]);
  //     });

  //     it('should return all videos', async () => {
  //       await request(app.getHttpServer())
  //         .post('/video')
  //         .set('Authorization', `Bearer ${authToken}`)
  //         .send(mockVideo);

  //       return request(app.getHttpServer())
  //         .get('/video')
  //         .expect(200)
  //         .expect((res) => {
  //           expect(res.body).toBeInstanceOf(Array);
  //           expect(res.body).toHaveLength(1);
  //           expect(res.body[0]).toMatchObject({
  //             title: mockVideo.title,
  //             description: mockVideo.description,
  //             url: mockVideo.url,
  //             email: mockUser.email,
  //           });
  //         });
  //     });
  //   });

  describe('/video (POST)', () => {
    it('should create a new video when authenticated', () => {
      return request(app.getHttpServer())
        .post('/video')
        .set('Authorization', `Bearer ${authToken}`)
        .send(mockVideo)
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject({
            title: mockVideo.title,
            description: mockVideo.description,
            url: mockVideo.url,
            email: mockUser.email,
          });
        });
    });

    it('should fail when not authenticated', () => {
      return request(app.getHttpServer())
        .post('/video')
        .send(mockVideo)
        .expect(401);
    });

    it('should fail with invalid token', () => {
      return request(app.getHttpServer())
        .post('/video')
        .set('Authorization', 'Bearer invalid-token')
        .send(mockVideo)
        .expect(401);
    });

    // it('should fail when title is missing', () => {
    //   const invalidVideo = { ...mockVideo, title: '' };
    //   return request(app.getHttpServer())
    //     .post('/video')
    //     .set('Authorization', `Bearer ${authToken}`)
    //     .send(invalidVideo)
    //     .expect(400)
    //     .expect((res) => {
    //       expect(res.body.message).toContain('title should not be empty');
    //     });
    // });

    // it('should fail when description is missing', () => {
    //   const invalidVideo = { ...mockVideo, description: '' };
    //   return request(app.getHttpServer())
    //     .post('/video')
    //     .set('Authorization', `Bearer ${authToken}`)
    //     .send(invalidVideo)
    //     .expect(400)
    //     .expect((res) => {
    //       expect(res.body.message).toContain('description should not be empty');
    //     });
    // });

    it('should fail when url is missing', () => {
      const invalidVideo = { ...mockVideo, url: '' };
      return request(app.getHttpServer())
        .post('/video')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidVideo)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('url should not be empty');
        });
    });

    it('should fail when trying to set email directly', () => {
      const invalidVideo = { ...mockVideo, email: 'hacker@evil.com' };
      return request(app.getHttpServer())
        .post('/video')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidVideo)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('Error');
        });
    });

    it('should fail when trying to set user directly', () => {
      const invalidVideo = { ...mockVideo, user: '507f1f77bcf86cd799439011' };
      return request(app.getHttpServer())
        .post('/video')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidVideo)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('Error');
        });
    });

    it('should fail when url is not a youtube link', () => {
      const invalidVideo = { ...mockVideo, url: 'https://invalid-url.com' };
      return request(app.getHttpServer())
        .post('/video')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidVideo)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain(
            'URL must be a valid YouTube link',
          );
        });
    });
  });
});
