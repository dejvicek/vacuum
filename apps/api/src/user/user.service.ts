import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  async createUser(username: string, password: string) {
    return db.insert(usersTable).values({ username, password }).returning();
  }

  async findAllUsers() {
    return db.select().from(usersTable);
  }

  async findUserById(id: number) {
    return db.select().from(usersTable).where(eq(usersTable.id, id));
  }

  async updateUser(id: number, username: string, password: string) {
    return db
      .update(usersTable)
      .set({ username, password })
      .where(eq(usersTable.id, id))
      .returning();
  }

  async deleteUser(id: number) {
    return db.delete(usersTable).where(eq(usersTable.id, id)).returning();
  }
}
