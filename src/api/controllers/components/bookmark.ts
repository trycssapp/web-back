import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const bookmarkComponent = async (req: Request, res: APIJson) => {
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

        const bookmarked = await prisma.componentSave.findFirst({
            where: { component: { id: componentId }, userId: req.user?.id },
        });

        if (bookmarked) {
            const deleted = await prisma.componentSave.delete({
                where: {
                    id: bookmarked.id,
                },
            });
            return res.json({
                payload: {
                    results: { deleted },
                },
                message: 'Removed bookmark',
            });
        } else {
            const saved = await prisma.componentSave.create({
                data: {
                    component: { connect: { id: componentId } },
                    user: { connect: { id: req.user?.id } },
                },
            });
            return res.json({
                payload: { results: { saved } },
                message: 'Bookmarked',
            });
        }
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        });
    }
};
