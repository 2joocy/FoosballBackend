import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Games', () => {
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

  test(`Can save a game`, async () => {
    const response = await request(app.getHttpServer())
      .post(`/games`)
      .send({ name: `Game 1` });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: `Game 1`,
    });
  });

  test(`Can get all games`, async () => {
    const response = await request(app.getHttpServer()).get(`/games`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test(`Can add a player to a game`, async () => {
    const player = await request(app.getHttpServer())
      .post(`/players`)
      .send({ name: `Player 1` });

    const game = await request(app.getHttpServer())
      .post(`/games`)
      .send({ name: `Game 1` });

    const response = await request(app.getHttpServer())
      .post(`/games/${game.body.id}/players`)
      .send({ playerId: player.body.id, goals: 6, was_winner: true });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      game_id: game.body.id,
      player_id: player.body.id,
      goals: 6,
      was_winner: true,
    });

    const gamePlayers = await request(app.getHttpServer()).get(
      `/games/${game.body.id}/players`,
    );
    expect(gamePlayers.body.length).toBe(1);
    expect(gamePlayers.body[0]).toEqual({
      game_id: game.body.id,
      player_id: player.body.id,
      goals: 6,
      was_winner: true,
    });
  });

  test(`Can get all players in a game`, async () => {
    const player1 = await request(app.getHttpServer())
      .post(`/players`)
      .send({ name: `Player 1` });

    const player2 = await request(app.getHttpServer())
      .post(`/players`)
      .send({ name: `Player 2` });

    const game = await request(app.getHttpServer())
      .post(`/games`)
      .send({ name: `Game 1` });

    await request(app.getHttpServer())
      .post(`/games/${game.body.id}/players`)
      .send({ playerId: player1.body.id, goals: 6, was_winner: true });

    await request(app.getHttpServer())
      .post(`/games/${game.body.id}/players`)
      .send({ playerId: player2.body.id, goals: 6, was_winner: true });

    const response = await request(app.getHttpServer()).get(
      `/games/${game.body.id}/players`,
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual([
      {
        game_id: game.body.id,
        player_id: player1.body.id,
        goals: 6,
        was_winner: true,
      },
      {
        game_id: game.body.id,
        player_id: player2.body.id,
        goals: 6,
        was_winner: true,
      },
    ]);
  });
});
