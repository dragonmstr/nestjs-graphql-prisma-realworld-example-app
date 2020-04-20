import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { AuthorizationToken } from 'app_modules/nestjs-authorization-token';

import { ApiService } from './api.service';
import { GraphQLResponseInterceptor } from './graphql-response.interceptor';
import { CreateArticleCommentDto } from './models/create-article-comment.dto';
import { CreateArticleDto } from './models/create-article.dto';
import { GetArticlesDto } from './models/get-articles.dto';
import { TagListInterceptor } from './tag-list.interceptor';

/**
 * This is REST API wrapper around graphql.
 * Backend API spec https://github.com/gothinkster/realworld/tree/master/api
 */
@Controller('api')
@UseInterceptors(GraphQLResponseInterceptor)
export class ApiController {
    constructor(private readonly service: ApiService) {}

    @Get('/')
    index() {
        return 'https://github.com/gothinkster/realworld/tree/master/api';
    }

    /**
     * Registration.
     */
    @Post('users')
    async createUser(@Req() request: any) {
        return this.service.createUser(request.body.user);
    }

    /**
     * Authentication.
     */
    @Post('users/login')
    async postUsersLogin(@Req() request: any) {
        return this.service.loginUser(request.body.user);
    }

    /**
     * Get current user.
     */
    @Get('user')
    async user(@AuthorizationToken() token: string) {
        return this.service.getCurrentUser(token);
    }

    /**
     * Update user.
     */
    @Put('user')
    async updateUser(@AuthorizationToken() token: string, @Req() request: any) {
        return this.service.updateUser({
            token,
            user: request.body.user,
        });
    }

    /**
     * Get user profile by name.
     * Authorization optional, if yes `following` property should be checked.
     */
    @Get('profiles/:username')
    async profilesUsername(@Param('username') name: string, @AuthorizationToken() token: string) {
        return this.service.getProfile({
            token,
            name,
        });
    }

    /**
     * Create article.
     */
    @Post('articles')
    @UseInterceptors(TagListInterceptor)
    async createArticle(@Req() request: any, @AuthorizationToken() token: string) {
        const createArticleDto: CreateArticleDto = request.body.article;
        return this.service.createArticle({ token, createArticleDto });
    }

    /**
     * Get all articles with optional filters.
     */
    @Get('articles')
    @UseInterceptors(TagListInterceptor)
    async getArticles(@AuthorizationToken() token?: string, @Query() query?: GetArticlesDto) {
        return this.service.getArticles({
            token,
            ...query,
        });
    }

    /**
     * Follow user.
     */
    @Post('profiles/:username/follow')
    @HttpCode(200)
    async followUser(@AuthorizationToken() token: string, @Param('username') username: string) {
        return this.service.followUser({
            token,
            username,
            value: true,
        });
    }

    @Delete('profiles/:username/follow')
    async unfollowUser(@AuthorizationToken() token: string, @Param('username') username: string) {
        return this.service.followUser({
            token,
            username,
            value: false,
        });
    }

    /**
     * Feed Articles.
     * Return multiple articles created by followed users, ordered by most recent first.
     * Authentication required.
     */
    @Get('articles/feed')
    @UseInterceptors(TagListInterceptor)
    async articlesFeed(@AuthorizationToken() token: string, @Query() query?: GetArticlesDto) {
        return this.service.feedArticles({
            token,
            limit: query?.limit,
            offset: query?.offset,
        });
    }

    /**
     * Get article by slug.
     */
    @Get('articles/:slug')
    @UseInterceptors(TagListInterceptor)
    async getArticle(@AuthorizationToken() token: string, @Param('slug') slug: string) {
        return this.service.getArticle({ token, slug });
    }

    /**
     * Update article.
     */
    @Put('articles/:slug')
    @UseInterceptors(TagListInterceptor)
    async updateArticle(
        @AuthorizationToken() token: string,
        @Param('slug') slug: string,
        @Req() request: any,
    ) {
        return this.service.updateArticle({ token, slug, data: request.body.article });
    }

    @Delete('articles/:slug')
    @UseInterceptors(TagListInterceptor)
    async deleteArticle(@AuthorizationToken() token: string, @Param('slug') slug: string) {
        return this.service.deleteArticle({ token, slug });
    }

    @Post('articles/:slug/comments')
    async createArticleComment(
        @AuthorizationToken() token: string,
        @Param('slug') slug: string,
        @Body('comment') comment: CreateArticleCommentDto,
    ) {
        return this.service.createArticleComment({ token, slug, comment });
    }

    /**
     * Get comments from an article.
     */
    @Get('articles/:slug/comments')
    async articleComments(@AuthorizationToken() token: string, @Param('slug') slug: string) {
        return this.service.articleComments({ token, slug });
    }

    @Delete('articles/:slug/comments/:id')
    async deleteComment(@AuthorizationToken() token: string, @Param('id') id: string) {
        return this.service.deleteComment({ token, id });
    }

    @Post('articles/:slug/favorite')
    @UseInterceptors(TagListInterceptor)
    async favoriteArticle(@AuthorizationToken() token: string, @Param('slug') slug: string) {
        return this.service.favoriteArticle({ token, slug, value: true });
    }

    @Delete('articles/:slug/favorite')
    @UseInterceptors(TagListInterceptor)
    async unfavoriteArticle(@AuthorizationToken() token: string, @Param('slug') slug: string) {
        return this.service.favoriteArticle({ token, slug, value: false });
    }

    /**
     * Get tags.
     */
    @Get('tags')
    async tags() {
        return this.service.getTags();
    }
}
