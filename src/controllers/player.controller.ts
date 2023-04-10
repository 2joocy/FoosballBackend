import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { DbService } from '../db/db.service';

@Controller(`/players`)
export class PlayerController {
  constructor(private readonly dbService: DbService) {}

  @Post()
  async signUpPlayer(@Body() body: { name: string }) {
    try {
      return await this.dbService.signupPlayer(body.name);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async getPlayers() {
    return await this.dbService.getPlayers();
  }

  @Get(`/:playerId/mmr`)
  async getPlayerMmr(@Param() params: { playerId: string }) {
    try {
      const mmr = await this.dbService.getPlayerMMR(params.playerId);
      return { mmr };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
