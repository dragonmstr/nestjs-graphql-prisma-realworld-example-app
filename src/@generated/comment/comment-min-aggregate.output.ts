import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentMinAggregate {
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

    @Field(() => String, {
        nullable: true,
    })
    authorId?: string;

    @Field(() => String, {
        nullable: true,
    })
    articleId?: string;
}
