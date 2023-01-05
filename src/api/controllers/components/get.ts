import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const getComponent = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        const post = await prisma.component.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
                likes: { include: { user: true } },
                saves: true,
            },
        });
        if (!post) {
            throw new Error('Component not found');
        } else return res.json({ payload: { results: post } });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
