import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

import { User } from '../user/models/user';
import { SessionTokenFields } from './models/session-user-fields';

/**
 * Authentication service.
 */
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * Returns accessToken.
     */
    async session(user: Pick<User, 'userId' | 'email'>) {
        const date = new Date();

        const payload: SessionTokenFields = { sub: user.userId, email: user.email };

        const accessTokenExpiresIn = this.configService.get<number>(
            'accessTokenExpiresIn',
            18 * 3600 * 1000,
        );
        const refreshTokenExpiresIn = this.configService.get<number>(
            'refreshTokenExpiresIn',
            30 * 24 * 3600 * 1000,
        );

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: accessTokenExpiresIn / 1000,
            }),
            refreshToken: randomBytes(Math.random() * 20 + 20).toString('hex'), // tslint:disable-line:insecure-random
            accessTokenExpiresAt: date.getTime() + accessTokenExpiresIn,
            refreshTokenExpiresAt: date.getTime() + refreshTokenExpiresIn,
        };
    }

    /**
     * Get user from store by refresh token and return new session.
     */
    // public async refresh(where: {}) {
    //     const authEntity = this.userService.findUnique(where);

    //     if (!authEntity || authEntity.refreshTokenExpiresAt > new Date().getTime()) {
    //         throw new UnauthorizedException();
    //     }

    //     return this.session(authEntity.user);
    // }
}
