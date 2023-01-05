import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const likeCompnoent = async (req: Request, res: APIJson) => {
    const componentId = req.params.id;

    try {
        const component = await prisma.component.findUnique({
            where: {
                id: componentId,
            },
        });

        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }

        const liked = await prisma.componentLike.findFirst({
            where: { component: { id: componentId }, userId: req.user?.id },
        });

        if (liked) {
            const deleted = await prisma.componentLike.delete({
                where: {
                    id: liked.id,
                },
            });
            return res.json({
                payload: {
                    results: { deleted },
                },
                message: 'Removed like',
            });
        } else {
            const like = await prisma.componentLike.create({
                data: {
                    component: { connect: { id: componentId } },
                    user: { connect: { id: req.user?.id } },
                },
            });
            return res.json({
                payload: { results: { like } },
                message: 'Liked',
            });
        }
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        });
    }
};
