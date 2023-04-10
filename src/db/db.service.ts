import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as path from 'path';
import { default as connection } from './db.connection';

type Player = {
  id: string;
  name: string;
};

type Game = {
  id: string;
  name: string;
};

type GamePlayer = {
  id: string;
  game_id: string;
  player_id: string;
  goals: number;
  was_winner: boolean;
};

@Injectable()
export class DbService {
  async initDb() {
    const client = await connection.connect();
    const file = readFileSync(path.resolve(`./tables.sql`), 'utf8');
    await client.query(file);
    client.release();
  }

  async signupPlayer(name: string): Promise<Player> {
    const client = await connection.connect();
    const player = await client.query({
      text: `INSERT INTO players (name) VALUES ($1) RETURNING *;`,
      values: [name],
    });
    client.release();
    return player.rows[0];
  }

  async getPlayers(): Promise<Array<Player>> {
    const client = await connection.connect();
    const { rows } = await client.query(`SELECT * FROM players`);
    client.release();
    return rows;
  }

  async createGame(gameName: string): Promise<Game> {
    const client = await connection.connect();
    const query = await client.query({
      text: `INSERT INTO games (name) VALUES ($1) RETURNING *;`,
      values: [gameName],
    });
    client.release();
    return query.rows[0];
  }

  async getGames(): Promise<Array<Game>> {
    const client = await connection.connect();
    const { rows } = await client.query(`SELECT * FROM games`);
    client.release();
    return rows;
  }

  async insertPlayerIntoGame(
    gameId: string,
    playerId: string,
    goals: number,
    wasWinner: boolean,
  ): Promise<GamePlayer> {
    const client = await connection.connect();
    const query = await client.query({
      text: `INSERT INTO game_players (game_id, player_id, goals, was_winner) VALUES ($1, $2, $3, $4) RETURNING *;`,
      values: [gameId, playerId, goals, wasWinner],
    });
    client.release();
    return query.rows[0];
  }

  async getGamePlayers(gameId: string): Promise<Array<GamePlayer>> {
    const client = await connection.connect();
    const query = await client.query({
      text: `SELECT * FROM game_players WHERE game_id = $1;`,
      values: [gameId],
    });
    client.release();
    return query.rows;
  }

  async getPlayerMMR(playerId: string): Promise<number> {
    const client = await connection.connect();
    const query = await client.query({
      text: `SELECT * FROM game_players WHERE player_id = $1;`,
      values: [playerId],
    });
    client.release();
    const games = query.rows as Array<GamePlayer>;
    const mmr = games.map((game) => {
      if (game.was_winner) {
        return game.goals + 10;
      }
      return game.goals - 10;
    });
    return mmr.reduce((partialSum, a) => partialSum + a, 0);
  }

  async getPlayerHistory(playerId: string): Promise<Array<GamePlayer>> {
    const client = await connection.connect();
    const query = await client.query({
      text: `SELECT * FROM game_players WHERE player_id = $1;`,
      values: [playerId],
    });
    client.release();
    return query.rows;
  }
}
