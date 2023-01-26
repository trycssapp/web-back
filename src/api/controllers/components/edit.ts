import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const editComponent = async (req: Request, res: APIJson) => {
    const postId = req.params.id;

    try {
        const post = await prisma.component.findUnique({
            where: {
                id: postId,
            },
        });
        if (post) {
            const { code, library, libraryVersion, css } = req.body;
            if (
                req.user &&
                (req.user.role == 'ADMIN' || req.user?.id === post.authorId)
            ) {
                const updated = await prisma.component.update({
                    data: {
                        css: css ?? undefined,
                        code: code ?? undefined,
                        library: library ?? undefined,
                        libraryVersion: libraryVersion ?? undefined,
                    },
                    where: {
                        id: postId,
                    },
                });
                if (updated) {
                    return res.json({ payload: { results: updated } });
                } else {
                    res.status(404).json({ error: 'Component not found' });
                }
            } else {
                return res.status(401);
            }
        } else return res.status(404).json({ error: 'Component not found' });
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        });
    }
};
