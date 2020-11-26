import { InputType, Field } from '@nestjs/graphql';
import { UserCreateWithoutFavoriteArticlesInput } from './user-create-without-favorite-articles.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserCreateOrConnectWithoutfavoriteArticlesInput } from './user-create-or-connect-withoutfavorite-articles.input';

@InputType()
export class UserCreateManyWithoutFavoriteArticlesInput {
    @Field(() => [UserCreateWithoutFavoriteArticlesInput], {
        nullable: true,
        description: undefined,
    })
    create?: UserCreateWithoutFavoriteArticlesInput | Array<UserCreateWithoutFavoriteArticlesInput>;

    @Field(() => [UserWhereUniqueInput], {
        nullable: true,
        description: undefined,
    })
    connect?: UserWhereUniqueInput | Array<UserWhereUniqueInput>;

    @Field(() => [UserCreateOrConnectWithoutfavoriteArticlesInput], {
        nullable: true,
        description: undefined,
    })
    connectOrCreate?:
        | UserCreateOrConnectWithoutfavoriteArticlesInput
        | Array<UserCreateOrConnectWithoutfavoriteArticlesInput>;
}
