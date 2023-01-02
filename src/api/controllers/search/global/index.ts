import { Request } from 'express';
import prisma from '../../../../lib/prisma';
import { APIJson } from '../../../../lib/types/types';

export const searchComponents = async (req: Request, res: APIJson) => {
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

        const components = await prisma.component.findMany({
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
        const pages = await prisma.component.findMany({
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
        const componentsAggregation = await prisma.componentCategory.findMany({
            include: {
                _count: {
                    select: {
                        components: {
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
        const pagesAggregation = await prisma.pageCategory.findMany({
            include: {
                _count: {
                    select: {
                        pages: {
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

        return res.json({
            payload: {
                results: { components, pages },

                // query: q,
                distribution: {
                    components: componentsAggregation.reduce(
                        (a, v) => ({ ...a, [v.value]: v._count?.components }),
                        {}
                    ),
                    pages: pagesAggregation.reduce(
                        (a, v) => ({ ...a, [v.value]: v._count?.pages }),
                        {}
                    ),
                },
                count: pages.length + components.length,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
