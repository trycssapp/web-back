import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const makeIntoLayout = async (req: Request, res: APIJson) => {
    const componentId = req.params.id;

    try {
        const component = await prisma.component.findUnique({
            where: {
                id: componentId,
            },
            include: { likes: true, saves: true },
        });
        if (component) {
            const {
                authorId,
                title,
                animated,
                code,
                createdAt,
                css,
                description,
                generatedImage,
                id,
                library,
                libraryVersion,
                responsive,
                theme,
            } = component;
            if (
                req.user &&
                (req.user.role == 'ADMIN' || req.user?.id === authorId)
            ) {
                const updated = await prisma.layout.create({
                    data: {
                        title,
                        animated,
                        //@ts-ignore
                        // authorId:
                        code,
                        categoryRelations: {
                            connect: { value: req.body.category },
                        },
                        createdAt,
                        //@ts-ignore
                        // css,
                        description,
                        generatedImage,
                        id,
                        // library,
                        libraryVersion,
                        responsive,
                        theme,
                        libraryRelations: { connect: { value: library! } },
                        author: { connect: { id: req.user.id } },
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
