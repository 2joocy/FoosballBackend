import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Players', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test(`Can save a player`, async () => {
    const res = await request(app.getHttpServer())
      .post(`/players`)
      .send({ name: `Player 1` })
      .expect(201);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: `Player 1`,
    });
  });

  test(`Can get all players`, async () => {
    const res = await request(app.getHttpServer()).get(`/players`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test(`Can get player MMR`, async () => {
    const player = await request(app.getHttpServer())
      .post(`/players`)
      .send({ name: `Player 1` });

    const game = await request(app.getHttpServer())
      .post(`/games`)
      .send({ name: `Game 1` });

    await request(app.getHttpServer())
      .post(`/games/${game.body.id}/players`)
      .send({ playerId: player.body.id, goals: 6, was_winner: true });

    const res = await request(app.getHttpServer()).get(
      `/players/${player.body.id}/mmr`,
    );

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      mmr: 16,
    });
  });
});
