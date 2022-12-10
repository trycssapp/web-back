import { Request } from 'express';
import prisma from '../../../../lib/prisma';
import { APIJson } from '../../../../lib/types/types';

export const searchPosts = async (req: Request, res: APIJson) => {
    const { q, filter } = req.body as {
        q: string;
        filter: {
            animated?: boolean;
            theme?: 'light' | 'dark';
            library: string;
            categories?: string[];
        };
    };
    try {
        const query = q
            ?.split(' ')
            .map((x) => x)
            .join('|');

        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                ...(query == '*'
                    ? {}
                    : {
                          title: {
                              contains: query,
                              mode: 'insensitive',
                          },
                          OR: {
                              description: {
                                  contains: query,
                                  mode: 'insensitive',
                              },
                          },
                      }),
                AND: {
                    library: {
                        equals: filter.library,
                    },
                    animated: {
                        equals: filter.animated,
                    },
                    theme: {
                        equals: filter.theme,
                    },
                    category: {
                        in: filter.categories,
                    },
                },
            },
            include: { author: true },
        });
        const aggregation = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        posts: {
                            where: {
                                library: {
                                    contains: filter.library,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!posts) {
            throw new Error('Post not found');
        } else
            return res.json({
                payload: {
                    results: posts,

                    // query: q,
                    distribution: aggregation.reduce(
                        (a, v) => ({ ...a, [v.value]: v._count?.posts }),
                        {}
                    ),
                    count: posts.length,
                },
            });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
