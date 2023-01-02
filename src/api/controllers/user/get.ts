import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const getUser = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                components: true,
            },
        });
        if (!user) {
            throw new Error('User not found');
        } else return res.json({ payload: { results: user } });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
