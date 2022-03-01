import { Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-firebase-jwt';
import AdminSchema, { Admin } from "../../admin/schemas/admin.schema";

@Injectable()
export class AdminAuthStrategy extends PassportStrategy(Strategy, "admin-auth") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any): Promise<Admin> {
    return payload._doc
  }
}
