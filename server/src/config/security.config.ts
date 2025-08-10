import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityConfig {
  constructor(private configService: ConfigService) {}

 
  getThrottlerConfig() {
    return {
      ttl: 60, // Time window in seconds
      limit: 100, // Max requests per window
    };
  }

  getSessionConfig() {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    
    return {
      secret: this.configService.getOrThrow<string>('SESSION_SECRET'),
      name: this.configService.getOrThrow<string>('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: this.parseTime(this.configService.getOrThrow<string>('SESSION_MAX_AGE')),
        httpOnly: false,
        secure: isProduction, 
        sameSite: 'lax' as const,
      },
    };
  }
  

  private parseTime(timeStr: string): number {
    const units = {
      's': 1000,
      'm': 60 * 1000,
      'h': 60 * 60 * 1000,
      'd': 24 * 60 * 60 * 1000,
    };
    
    const match = timeStr.match(/^(\d+)([smhd])$/);
    if (!match) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }
    
    const [, amount, unit] = match;
    return parseInt(amount) * units[unit];
  }
}
