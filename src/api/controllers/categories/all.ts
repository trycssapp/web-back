import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const allCategories = async (req: Request, res: APIJson) => {
    const { type } = req.query as { type: 'components' | 'pages' };

    try {
        const categories =
            type === 'components'
                ? await prisma.componentCategory.findMany()
                : await prisma.pageCategory.findMany();

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
