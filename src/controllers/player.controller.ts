import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Controller(`/players`)
export class PlayerController {
  constructor(private readonly dbService: DbService) {}

  @Post()
  async signUpPlayer(@Body() body: { name: string }) {
    return await this.dbService.signupPlayer(body.name);
  }

  @Get()
  async getPlayers() {
    return await this.dbService.getPlayers();
  }

  @Get(`/:playerId/mmr`)
  async getPlayerMmr(@Param() params: { playerId: string }) {
    const mmr = await this.dbService.getPlayerMMR(params.playerId);
    return { mmr };
  }
}
