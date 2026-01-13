import { ConflictException, Injectable } from '@nestjs/common';
import { db } from '../db';
import { playersTable } from '../db/schema';
import { asc, eq } from 'drizzle-orm';
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

  async findByNickName(nickName: string): Promise<Player[]> {
    return db
      .select()
      .from(playersTable)
      .where(eq(playersTable.nick_name, nickName));
  }

  async savePlayer(data: CreatePlayer): Promise<SharedPlayer> {
    const normalizedData = {
      ...data,
      nick_name: data.nick_name.trim(),
      first_name: data.first_name?.trim() ?? null,
      last_name: data.last_name?.trim() ?? null,
    };

    const existing = await this.findByNickName(normalizedData.nick_name);
    if (existing.length > 0) {
      throw new ConflictException(
        `Player with nickname "${normalizedData.nick_name}" already exists`,
      );
    }

    const [player] = await db
      .insert(playersTable)
      .values(normalizedData)
      .returning();

    return this.mapToSharedPlayer(player);
  }

  private mapToSharedPlayer(player: Player): SharedPlayer {
    return {
      ...player,
      created_at: player.created_at.toISOString(),
    };
  }
}
