import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const editLayout = async (req: Request, res: APIJson) => {
    const postId = req.params.id;

    try {
        const post = await prisma.layout.findUnique({
            where: {
                id: postId,
            },
        });
        if (post) {
            if (
                req.user &&
                (req.user.role == 'ADMIN' || req.user?.id === post.authorId)
            ) {
                const updated = await prisma.layout.update({
                    data: {
                        ...req.body,
                    },
                    where: {
                        id: postId,
                    },
                });
                if (updated) {
                    return res.json({ payload: { results: updated } });
                } else {
                    res.status(404).json({ error: 'Page not found' });
                }
            } else {
                return res.status(401);
            }
        } else return res.status(404).json({ error: 'Page not found' });
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        });
    }
};
