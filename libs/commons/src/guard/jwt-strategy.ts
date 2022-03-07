import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';  
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_SECRET_TOKEN,
    });
  }

  async validate(payload: any) : Promise<any> {

    /**
     * check user if exist or not
     */
    // const user = await this.authService.checkUser(payload.user?.Username);
    // if(!user) {
    //   console.log(`JWT Token is acceptable but invalid ${payload.user.Username}`);
    //   throw new UnauthorizedException();
    // }

    return payload.user;
  }
}