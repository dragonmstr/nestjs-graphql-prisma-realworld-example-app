import { Field, InputType } from 'type-graphql';

/**
 * Update user input type.
 */
@InputType()
export class UserUpdateInput {
    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    email?: string | null;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    name?: string | null;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    password?: string | null;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    bio?: string | null;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    image?: string | null;
}
