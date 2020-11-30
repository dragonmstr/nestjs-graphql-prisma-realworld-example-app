import { InputType, Field } from '@nestjs/graphql';
import { ArticleCreateWithoutUserInput } from './article-create-without-user.input';
import { ArticleWhereUniqueInput } from './article-where-unique.input';
import { ArticleCreateOrConnectWithoutUserInput } from './article-create-or-connect-without-user.input';

@InputType()
export class ArticleCreateManyWithoutUserInput {
    @Field(() => [ArticleCreateWithoutUserInput], {
        nullable: true,
    })
    create?: ArticleCreateWithoutUserInput | Array<ArticleCreateWithoutUserInput>;

    @Field(() => [ArticleWhereUniqueInput], {
        nullable: true,
    })
    connect?: ArticleWhereUniqueInput | Array<ArticleWhereUniqueInput>;

    @Field(() => [ArticleCreateOrConnectWithoutUserInput], {
        nullable: true,
    })
    connectOrCreate?:
        | ArticleCreateOrConnectWithoutUserInput
        | Array<ArticleCreateOrConnectWithoutUserInput>;
}
