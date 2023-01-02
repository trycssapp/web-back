import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const removeComponent = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        if (id == '*') {
            const posts = await prisma.component.findMany({});
            posts.forEach(async (x) => {
                console.log(x);

                const deleted = await prisma.component.deleteMany({
                    where: {
                        id: x.id,
                    },
                });
                if (deleted) {
                    return res.json({ message: 'deleted all posts' });
                } else {
                    return res
                        .status(400)
                        .json({ message: 'failed to delete all posts' });
                }
            });
        } else {
            const post = await prisma.component.delete({
                where: {
                    id,
                },
            });
            if (!post) {
                res.status(404).json({ error: 'Component not found' });
            } else if (post?.authorId !== req.user?.id) {
                res.status(401).json({ error: 'true' });
            } else return res.json({ message: 'Deleted post' });
        }
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
