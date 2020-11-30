import { Field, InputType } from '@nestjs/graphql';

import { ArticleCreateOneWithoutCommentsInput } from '../article/article-create-one-without-comments.input';

@InputType()
export class CommentCreateWithoutAuthorInput {
    @Field(() => String, {
        nullable: true,
    })
    commentId?: string;

    @Field(() => String, {
        nullable: true,
    })
    createdAt?: Date | string;

    @Field(() => String, {
        nullable: true,
    })
    updatedAt?: Date | string;

    @Field(() => String, {
        nullable: true,
    })
    body?: string;

    @Field(() => ArticleCreateOneWithoutCommentsInput, {
        nullable: true,
    })
    article?: ArticleCreateOneWithoutCommentsInput;
}
