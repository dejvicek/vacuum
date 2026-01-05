import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private readonly client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_PROJECT_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    if (!supabaseUrl) {
      throw new Error(
        'SUPABASE_PROJECT_URL is not defined in environment variables',
      );
    }

    if (!supabaseKey) {
      throw new Error(
        'SUPABASE_ANON_KEY is not defined in environment variables',
      );
    }

    this.client = createClient(supabaseUrl, supabaseKey);
    this.logger.log('Supabase client initialized');
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
