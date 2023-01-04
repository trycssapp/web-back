import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const allCategories = async (req: Request, res: APIJson) => {
    const { type } = req.query as { type: 'component' | 'layout' };

    try {
        const categories =
            type === 'component'
                ? await prisma.componentCategory.findMany()
                : await prisma.layoutCategory.findMany();

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
