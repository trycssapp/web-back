import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const removeCategory = async (req: Request, res: APIJson) => {
    const value = req.params.value;

    try {
        if (value == '*') {
            const categories = await prisma.category.findMany({});
            categories.forEach(async (x) => {
                console.log(x);

                const deleted = await prisma.category.deleteMany({
                    where: {
                        value: x.value,
                    },
                });
                if (deleted) {
                    return res.json({ message: 'deleted all categories' });
                } else {
                    return res
                        .status(400)
                        .json({ message: 'failed to delete all' });
                }
            });
        } else {
            const category = await prisma.category.findUnique({
                where: {
                    value: 'Buttons',
                },
            });
            if (!category) {
                res.status(404).json({ error: 'Category not found' });
            } else {
                console.log(category);
                const deleted = await prisma.category.delete({
                    where: {
                        value: value,
                    },
                });
                if (deleted) {
                    return res.json({ message: 'Deleted category' });
                } else
                    return res
                        .status(400)
                        .json({ error: 'Failed to delete category' });
            }
        }
    } catch (error: any) {
        console.log(error.message);

        res.status(400).json({
            error: error.message,
        });
    }
};
