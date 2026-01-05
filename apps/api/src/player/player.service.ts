import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { playersTable } from '../db/schema';
import { asc } from 'drizzle-orm';
import type { Player } from './player.types';

@Injectable()
export class PlayerService {
  async getPlayers(): Promise<Player[]> {
    return db.select().from(playersTable).orderBy(asc(playersTable.nick_name));
  }
}
