import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Controller(`/games`)
export class GameController {
  constructor(private readonly dbService: DbService) {}

  @Post()
  async createGame(@Body() body: { name: string }) {
    return await this.dbService.createGame(body.name);
  }

  @Get()
  async getGames() {
    return await this.dbService.getGames();
  }

  @Post(`/:gameId/players`)
  async insertPlayerIntoGame(
    @Body() body: { playerId: string; goals: number; was_winner: boolean },
    @Param() params: { gameId: string },
  ) {
    return await this.dbService.insertPlayerIntoGame(
      params.gameId,
      body.playerId,
      body.goals,
      body.was_winner,
    );
  }

  @Get(`/:gameId/players`)
  async getGamePlayers(@Param() params: { gameId: string }) {
    return await this.dbService.getGamePlayers(params.gameId);
  }
}
