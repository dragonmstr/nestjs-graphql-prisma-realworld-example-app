import { InputType, Field } from '@nestjs/graphql';
import { UserCreateWithoutCommentsInput } from './user-create-without-comments.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutCommentsInput } from './user-update-without-comments.input';
import { UserUpsertWithoutCommentsInput } from './user-upsert-without-comments.input';
import { UserCreateOrConnectWithoutcommentsInput } from './user-create-or-connect-withoutcomments.input';

@InputType()
export class UserUpdateOneRequiredWithoutCommentsInput {
    @Field(() => UserCreateWithoutCommentsInput, {
        nullable: true,
    })
    create?: UserCreateWithoutCommentsInput;

    @Field(() => UserWhereUniqueInput, {
        nullable: true,
    })
    connect?: UserWhereUniqueInput;

    @Field(() => UserUpdateWithoutCommentsInput, {
        nullable: true,
    })
    update?: UserUpdateWithoutCommentsInput;

    @Field(() => UserUpsertWithoutCommentsInput, {
        nullable: true,
    })
    upsert?: UserUpsertWithoutCommentsInput;

    @Field(() => UserCreateOrConnectWithoutcommentsInput, {
        nullable: true,
    })
    connectOrCreate?: UserCreateOrConnectWithoutcommentsInput;
}
