import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const editUser = async (req: Request, res: APIJson) => {
    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const edited = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    ...req.body,
                },
            });
            if (edited) {
                return res.json({ payload: { results: edited } });
            } else {
                res.status(400).json({ error: 'Failed to update user' });
            }
        }
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        });
    }
};
