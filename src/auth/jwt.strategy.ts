import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // Import ConfigService if using environment variables for configuration
import { UsersService } from '../users/users.service';
export interface JwtPayload {
  username: string; // Example: Username of the authenticated user
  sub: string; // Example: Subject (typically user ID) of the authenticated user
  // Add any additional fields you want to include in the JWT payload
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
    this.logger.debug(`Using JWT secret: ${configService.get('JWT_SECRET')}`);
  }

  async validate(payload: JwtPayload) {
    console.log(`Validating user with payload: ${JSON.stringify(payload)}`);
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
