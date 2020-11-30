import { InputType, Field } from '@nestjs/graphql';
import { ArticleWhereUniqueInput } from './article-where-unique.input';
import { ArticleUpdateWithoutUserInput } from './article-update-without-user.input';
import { ArticleCreateWithoutUserInput } from './article-create-without-user.input';

@InputType()
export class ArticleUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => ArticleWhereUniqueInput, {
        nullable: true,
    })
    where?: ArticleWhereUniqueInput;

    @Field(() => ArticleUpdateWithoutUserInput, {
        nullable: true,
    })
    update?: ArticleUpdateWithoutUserInput;

    @Field(() => ArticleCreateWithoutUserInput, {
        nullable: true,
    })
    create?: ArticleCreateWithoutUserInput;
}
