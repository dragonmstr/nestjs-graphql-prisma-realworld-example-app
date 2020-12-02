import { registerEnumType } from '@nestjs/graphql';

export enum ArticleDistinctFieldEnum {
    articleId = 'articleId',
    slug = 'slug',
    title = 'title',
    description = 'description',
    body = 'body',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    favoritesCount = 'favoritesCount',
    authorId = 'authorId',
}

registerEnumType(ArticleDistinctFieldEnum, { name: 'ArticleDistinctFieldEnum' });