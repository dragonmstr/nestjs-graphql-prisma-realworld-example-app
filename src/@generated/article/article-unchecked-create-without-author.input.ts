import { Field, InputType, Int } from '@nestjs/graphql';

import { CommentCreateManyWithoutArticleInput } from '../comment/comment-create-many-without-article.input';

@InputType()
export class ArticleUncheckedCreateWithoutAuthorInput {
    @Field(() => String, {
        nullable: true,
    })
    articleId?: string;

    @Field(() => String, {
        nullable: false,
    })
    slug!: string;

    @Field(() => String, {
        nullable: false,
    })
    title!: string;

    @Field(() => String, {
        nullable: false,
    })
    description!: string;

    @Field(() => String, {
        nullable: false,
    })
    body!: string;

    @Field(() => Date, {
        nullable: true,
    })
    createdAt?: Date | string;

    @Field(() => Date, {
        nullable: true,
    })
    updatedAt?: Date | string;

    @Field(() => Int, {
        nullable: true,
    })
    favoritesCount?: number;

    @Field(() => CommentCreateManyWithoutArticleInput, {
        nullable: true,
    })
    comments?: CommentCreateManyWithoutArticleInput;
}
