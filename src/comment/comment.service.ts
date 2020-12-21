import { Injectable } from '@nestjs/common';
import {
    ArticleWhereUniqueInput,
    CommentCreateArgs,
    FindManyCommentArgs,
    Prisma,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

/**
 * Service for managing article comments.
 */
@Injectable()
export class CommentService {
    update = this.prisma.comment.update;
    delete = this.prisma.comment.delete;
    findUnique = this.prisma.comment.findUnique;
    findMany = this.prisma.comment.findMany;

    constructor(private readonly prisma: PrismaService) {}

    async get(args: {
        where: ArticleWhereUniqueInput;
        follower?: { id: string };
    }) {
        const parameters: FindManyCommentArgs = {
            where: {
                article: args.where,
            },
            orderBy: { commentId: 'desc' },
            include: {
                author: {
                    include: args.follower
                        ? {
                              followers: {
                                  select: { userId: true },
                                  where: { userId: args.follower.id },
                                  take: 1,
                              },
                          }
                        : undefined,
                },
            },
        };
        return this.findMany(parameters);
    }

    async createComment(args: {
        where: ArticleWhereUniqueInput;
        body: string;
        authorId: string;
    }) {
        const commentCreateArgs: CommentCreateArgs = {
            data: {
                body: args.body,
                author: {
                    connect: { userId: args.authorId },
                },
                article: {
                    connect: args.where,
                },
            },
            include: {
                author: true,
            },
        };
        return this.prisma.comment.create(commentCreateArgs);
    }
}
