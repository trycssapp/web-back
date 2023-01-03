import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const getPage = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        const post = await prisma.page.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
            },
        });
        if (!post) {
            throw new Error('Page not found');
        } else return res.json({ payload: { results: post } });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};