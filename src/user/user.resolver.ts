import { UserWhereUniqueInput } from '@generated/type-graphql/resolvers/inputs/UserWhereUniqueInput';
import { NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
    Args,
    Context,
    Info,
    Mutation,
    Parent,
    Query,
    ResolveProperty,
    Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'app_modules/current-user-decorator';
import {
    GraphqlAuthGuard,
    OptionalGraphqlAuthGuard,
} from 'app_modules/nestjs-passport-graphql-auth-guard';

import { AuthService } from '../auth/auth.service';
import { GraphQLContext } from '../types';
import { PassportUserFields } from './models/passport-user-fields';
import { User } from './models/user';
import { UserCreateInput } from './models/user-create-input';
import { UserLoginInput } from './models/user-login-input';
import { UserUpdateInput } from './models/user-update-input';
import { UserService } from './user.service';

/**
 * Resolves user object type.
 */
@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Query(() => User)
    @UseGuards(GraphqlAuthGuard)
    async me(@CurrentUser() user: PassportUserFields) {
        return this.userService.findOne({ id: user.id });
    }

    @Query(() => User)
    @UseGuards(OptionalGraphqlAuthGuard)
    async user(@Args('where') where: UserWhereUniqueInput, @Info() info) {
        const user = await this.userService.findOne(where);
        if (!user) {
            throw new NotFoundException(`User with ${JSON.stringify(where)} do not exists.`);
        }
        return user;
    }

    @Mutation(() => User)
    async createUser(@Args('data') data: UserCreateInput, @Context() context: GraphQLContext) {
        const user = await this.userService.create(data);
        ({ accessToken: context.token } = await this.authService.session(user));
        return user;
    }

    @Mutation(() => User)
    @UseGuards(GraphqlAuthGuard)
    async updateUser(@Args('data') data: UserUpdateInput, @CurrentUser() user: PassportUserFields) {
        return this.userService.update({ id: user.id }, data);
    }

    @Mutation(() => User)
    async loginUser(@Args('data') data: UserLoginInput, @Context() context: GraphQLContext) {
        const user = await this.userService.findOneByCredentials(data);
        if (!user) {
            throw new UnauthorizedException();
        }
        ({ accessToken: context.token } = await this.authService.session(user));
        return user;
    }

    @ResolveProperty(() => String, { nullable: true })
    password(@Parent() user: User) {
        return undefined;
    }

    @ResolveProperty(() => String, { nullable: true })
    async token(@Parent() user: User, @Context() context: GraphQLContext) {
        return context.token;
    }

    /**
     * Check if current user is follow some user.
     */
    @ResolveProperty(() => Boolean)
    async following(
        @Parent() user: User,
        @CurrentUser() currentUser?: PassportUserFields,
    ): Promise<boolean> {
        if (!currentUser) {
            return false;
        }
        return this.userService.isFollowing(user.id, currentUser.id);
    }
}
