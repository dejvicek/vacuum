import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { playersTable } from '../db/schema';
import { asc } from 'drizzle-orm';
import { Player } from './player.types';
import {
  Player as SharedPlayer,
  CreatePlayer,
} from '@shared-types/Player/player.types';

@Injectable()
export class PlayerService {
  async getPlayers(): Promise<SharedPlayer[]> {
    const players = await db
      .select()
      .from(playersTable)
      .orderBy(asc(playersTable.nick_name));

    return players.map((player: Player) => this.mapToSharedPlayer(player));
  }

  async savePlayer(data: CreatePlayer): Promise<SharedPlayer> {
    const [player] = await db.insert(playersTable).values(data).returning();

    return this.mapToSharedPlayer(player);
  }

  private mapToSharedPlayer(player: Player): SharedPlayer {
    return {
      ...player,
      created_at: player.created_at.toISOString(),
    };
  }
}
