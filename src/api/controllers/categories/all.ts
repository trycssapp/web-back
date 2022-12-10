import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const allCategories = async (req: Request, res: APIJson) => {
    const { library } = req.query as { library: string };

    try {
        const categories = await prisma.category.findMany({
            // include: {
            //     _count: {
            //         select: {
            //             posts: {
            //                 where: {
            //                     library: {
            //                         contains: library,
            //                         mode: 'insensitive',
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // },
        });

        if (!categories) {
            throw new Error('No categories');
        } else
            return res.json({
                payload: { results: categories, count: categories.length },
            });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
