import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const removePost = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });
        if (post) {
            if (
                req.user &&
                (req.user.role == 'ADMIN' || req.user?.id === post.authorId)
            ) {
                const deleted = await prisma.post.delete({
                    where: {
                        id,
                    },
                });
                if (deleted) {
                    return res.json({ message: 'Deleted post' });
                } else {
                    res.status(404).json({ error: 'Post not found' });
                }
            } else {
                return res.status(401);
            }
        } else return res.status(404).json({ error: 'Post not found' });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
