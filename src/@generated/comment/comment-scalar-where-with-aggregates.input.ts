import { Field, InputType } from '@nestjs/graphql';

import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class CommentScalarWhereWithAggregatesInput {
    @Field(() => [CommentScalarWhereWithAggregatesInput], { nullable: true })
    AND?: Array<CommentScalarWhereWithAggregatesInput>;

    @Field(() => [CommentScalarWhereWithAggregatesInput], { nullable: true })
    OR?: Array<CommentScalarWhereWithAggregatesInput>;

    @Field(() => [CommentScalarWhereWithAggregatesInput], { nullable: true })
    NOT?: Array<CommentScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    commentId?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
    updatedAt?: DateTimeWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    body?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    authorId?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, { nullable: true })
    articleId?: StringWithAggregatesFilter;
}
