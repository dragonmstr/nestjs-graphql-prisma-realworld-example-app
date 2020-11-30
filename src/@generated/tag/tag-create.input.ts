import { InputType, Field } from '@nestjs/graphql';
import { ArticleCreateManyWithoutTagsInput } from '../article/article-create-many-without-tags.input';

@InputType()
export class TagCreateInput {
    @Field(() => String, {
        nullable: true,
    })
    tagId?: string;

    @Field(() => String, {
        nullable: true,
    })
    name?: string;

    @Field(() => ArticleCreateManyWithoutTagsInput, {
        nullable: true,
    })
    articles?: ArticleCreateManyWithoutTagsInput;
}
