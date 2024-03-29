import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const createComponent = async (req: Request, res: APIJson) => {
    const userId = req?.user?.id;
    const {
        title,
        animated,
        code,
        description,
        generatedImage,
        css,
        id,
        libraryVersion,
        theme,
        responsive,
    } = req.body;
    try {
        const category = await prisma.componentCategory.findUnique({
            where: { value: req.body.category },
        });

        if (!category) {
            return res.status(400).json({
                error: `Category ${req.body.category} does not exist.`,
            });
        } else {
            const added = await prisma.component.create({
                data: {
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                    categoryRelations: {
                        connect: {
                            value: req.body.category,
                        },
                    },
                    libraryRelations: {
                        connect: {
                            value: req.body.library,
                        },
                    },
                    title,
                    animated,
                    css,
                    code,
                    responsive,
                    libraryVersion,
                    description,
                    generatedImage,
                    id,
                    theme,
                },
            });
            if (!added) {
                res.status(404).json({ error: 'Failed to add component' });
            } else {
                return res.json({ payload: { results: added } });
            }
        }
    } catch (error: any) {
        console.log(error.message);

        res.status(400).json({
            error: error.message,
        });
    }
};
