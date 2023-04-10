import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { DbService } from '../db/db.service';

@Controller(`/games`)
export class GameController {
  constructor(private readonly dbService: DbService) {}

  @Post()
  async createGame(@Body() body: { name: string }) {
    try {
      return await this.dbService.createGame(body.name);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async getGames() {
    return await this.dbService.getGames();
  }

  @Post(`/:gameId/players`)
  async insertPlayerIntoGame(
    @Body() body: { playerId: string; goals: number; wasWinner: boolean },
    @Param() params: { gameId: string },
  ) {
    try {
      return await this.dbService.insertPlayerIntoGame(
        params.gameId,
        body.playerId,
        body.goals,
        body.wasWinner,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(`/:gameId/players`)
  async getGamePlayers(@Param() params: { gameId: string }) {
    try {
      return await this.dbService.getGamePlayers(params.gameId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
