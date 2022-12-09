import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const addDummyData = async (req: Request, res: APIJson) => {
    const userId = req?.user?.id;
    const posts = [
        {
            title: 'Tailwind CSS Recipe app',
            description: 'a simple Recipe app made using Tailwind CSS',
            category: 'buttons',
            library: 'bulma',
            libraryVersion: '0.9',
            theme: 'Light',
            code: 'any',
            responsive: false,
            animated: false,
        },
        {
            title: 'Bulma CSS Recipe app',
            description: 'a simple Recipe app made using Tailwind CSS',
            category: 'buttons',
            library: 'bulma',
            libraryVersion: '0.9',
            theme: 'Light',
            code: 'any',
            responsive: false,
            animated: false,
        },
    ];

    try {
        const added = posts.map(async (x) => {
            await prisma.post.create({
                data: {
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                    categoryRelations: {
                        connect: {
                            value: x.category,
                        },
                    },
                    libraryRelations: {
                        connect: {
                            value: x.library,
                        },
                    },
                    ...(({ library, category, ...o }) => o)(x),
                },
            });
        });
        if (added) {
            res.json({ message: 'Added' });
        } else {
            res.status(400).json({ error: 'somethign happened' });
        }
    } catch (error: any) {
        console.log(error.message);

        res.status(400).json({
            error: error.message,
        });
    }
};
