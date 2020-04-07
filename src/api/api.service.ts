import { Inject, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';

import { ArticleCreateInput } from './models/article-create-input';
import { CreateArticleDto } from './models/create-article.dto';
import { CreateUserDto } from './models/create-user.dto';
import { LoginUserDto } from './models/login-user.dto';
import { UpdateUserDto } from './models/update-user.dto';
import { UserEnvelope } from './models/user-envelope';

@Injectable()
export class ApiService {
    constructor(@Inject('GraphQLClient') private readonly graphqlClient: GraphQLClient) {}

    /**
     * Send mutation query to create user.
     */
    async createUser(envelope: UserEnvelope<CreateUserDto>) {
        const createUserData = {
            name: envelope.user.username,
            email: envelope.user.email,
            password: envelope.user.password,
        };
        const query = /* GraphQL */ `
            mutation createUser($createUserData: UserCreateInput!) {
                user: createUser(data: $createUserData) {
                    email
                    username: name
                    token
                    bio
                    image
                }
            }
        `;
        return this.graphqlClient.request(query, { createUserData });
    }

    /**
     * Send mutation query for login.
     */
    async loginUser(envelope: UserEnvelope<LoginUserDto>) {
        const loginUserData = {
            email: envelope.user.email,
            password: envelope.user.password,
        };
        const query = /* GraphQL */ `
            mutation loginUser($data: UserLoginInput!) {
                user: loginUser(data: $data) {
                    email
                    username: name
                    token
                    bio
                    image
                }
            }
        `;
        return this.graphqlClient.request(query, { data: loginUserData });
    }

    /**
     * Get current user, authentication required.
     */
    async getCurrentUser(token: string) {
        const query = /* GraphQL */ `
            query {
                user: me {
                    email
                    username: name
                    token
                    bio
                    image
                }
            }
        `;
        return this.graphqlClient.setHeader('Authorization', `Bearer ${token}`).request(query);
    }

    /**
     * Get current user, authentication required.
     */
    async updateUser({ token, user }: { token: string; user: UpdateUserDto }) {
        const query = /* GraphQL */ `
            mutation updateUser($data: UserUpdateInput!) {
                user: updateUser(data: $data) {
                    email
                    username: name
                    token
                    bio
                    image
                }
            }
        `;
        return this.graphqlClient
            .setHeader('Authorization', `Bearer ${token}`)
            .request(query, { data: user });
    }

    /**
     * Get current user.
     * Authorization optional, if yes `following` property should be checked.
     */
    async getProfile({ token, name }: { token: string; name: string }) {
        const query = /* GraphQL */ `
            query user($input: UserWhereUniqueInput!) {
                profile: user(where: $input) {
                    username: name
                    bio
                    image
                    following
                }
            }
        `;
        return this.graphqlClient.setHeader('Authorization', `Bearer ${token}`).request(query, {
            input: { name },
        });
    }

    /**
     * Create article.
     */
    async createArticle({
        token,
        createArticleDto,
    }: {
        token: string;
        createArticleDto: CreateArticleDto;
    }) {
        const query = /* GraphQL */ `
            mutation createArticle($input: ArticleCreateInput!) {
                article: createArticle(input: $input) {
                    slug
                    title
                    description
                    body
                    tags {
                        name
                    }
                    createdAt
                    updatedAt
                    favorited
                    favoritesCount
                    author {
                        username: name
                        bio
                        image
                        following
                    }
                }
            }
        `;
        const input: ArticleCreateInput = {
            body: createArticleDto.body,
            description: createArticleDto.description,
            title: createArticleDto.title,
            tags: createArticleDto.tagsList,
        };
        const articleResponseObject = await this.graphqlClient
            .setHeader('Authorization', `Bearer ${token}`)
            .request(query, { input });
        articleResponseObject.article.tagList = articleResponseObject.article.tags.map(
            (t) => t.name,
        );
        return articleResponseObject;
    }

    async getArticles({ token }: { token?: string }) {
        const query = /* GraphQL */ `
            query articles($where: ?) {
                articles: articles(where: $where) {
                    username: name
                    bio
                    image
                    following
                }
            }
        `;
        return this.graphqlClient.setHeader('Authorization', `Bearer ${token}`).request(query, {});
    }

    /**
     * Returns a list of tags.
     */
    async getTags() {
        return this.graphqlClient.request(/* GraphQL */ `
            query tags {
                    id
                    name
                }
            }
        `);
    }
}
