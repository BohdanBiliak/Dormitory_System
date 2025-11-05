import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisSessionService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private sessionPrefix: string;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = createClient({
      url: this.configService.getOrThrow('REDIS_URI'),
    }) as RedisClientType;

    await this.client.connect();
    
    this.sessionPrefix = this.configService.getOrThrow<string>('SESSION_FOLDER') + ':';
    console.log('Redis Session Service initialized');
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.disconnect();
    }
  }

  async getSessionData(sessionId: string): Promise<any> {
    try {
      const sessionKey = this.sessionPrefix + sessionId;
      const sessionData = await this.client.get(sessionKey);
      
      if (!sessionData) {
        return null;
      }

      return JSON.parse(sessionData);
    } catch (error) {
      console.error('Error getting session data:', error);
      return null;
    }
  }

  async getUserFromSession(sessionId: string): Promise<{ id: string; role: string; email: string; displayName: string } | null> {
    try {
      const sessionData = await this.getSessionData(sessionId);
      
      if (!sessionData || !sessionData.user) {
        return null;
      }

      return sessionData.user;
    } catch (error) {
      console.error('Error getting user from session:', error);
      return null;
    }
  }

  async validateSession(sessionId: string): Promise<boolean> {
    try {
      const sessionKey = this.sessionPrefix + sessionId;
      const exists = await this.client.exists(sessionKey);
      return exists === 1;
    } catch (error) {
      console.error('Error validating session:', error);
      return false;
    }
  }

  extractSessionIdFromCookie(cookieValue: string): string | null {
    try {
      // Handle URL-encoded cookie values
      const decoded = decodeURIComponent(cookieValue);

      // If cookie is signed (starts with 's:'), extract the value before the signature
      if (decoded.startsWith('s:')) {
        const sessionPart = decoded.slice(2); // Remove 's:'
        const dotIndex = sessionPart.lastIndexOf('.');
        return dotIndex > 0 ? sessionPart.slice(0, dotIndex) : sessionPart;
      }

      return decoded;
    } catch (error) {
      console.error('Error extracting session ID:', error);
      return null;
    }
  }

  parseCookies(cookieHeader: string): Record<string, string> {
    const cookies: Record<string, string> = {};

    if (!cookieHeader) {
      return cookies;
    }

    cookieHeader.split(';').forEach((cookie) => {
      const [name, ...rest] = cookie.trim().split('=');
      if (name && rest.length) {
        cookies[name] = rest.join('=');
      }
    });

    return cookies;
  }
}