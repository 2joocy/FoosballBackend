import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { PlayerController } from './controllers/player.controller';
import { DbService } from './db/db.service';

@Module({
  imports: [],
  controllers: [PlayerController, GameController],
  providers: [DbService],
})
export class AppModule {}
