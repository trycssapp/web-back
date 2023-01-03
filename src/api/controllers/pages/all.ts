import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const allPages = async (req: Request, res: APIJson) => {
    try {
        const page = await prisma.page.findMany({
            include: { author: true },
            orderBy: { createdAt: 'desc' },
        });
        if (!page) {
            res.status(404).json({ error: 'No page' });
        } else
            return res.json({
                payload: { results: page, count: page.length },
            });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
