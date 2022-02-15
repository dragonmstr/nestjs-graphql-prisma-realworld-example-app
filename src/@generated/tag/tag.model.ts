import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Article } from '../article/article.model';
import { TagCount } from './tag-count.output';

@ObjectType()
export class Tag {
    @Field(() => ID, { nullable: false })
    tagId!: string;

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => [Article], { nullable: true })
    articles?: Array<Article>;

    @Field(() => TagCount, { nullable: false })
    _count?: TagCount;
}
