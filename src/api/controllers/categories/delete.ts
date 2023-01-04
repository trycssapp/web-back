import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const removeCategory = async (req: Request, res: APIJson) => {
    const { type } = req.query as { type: 'component' | 'layout' };
    const value = req.params.value;

    try {
        const category =
            type === 'component'
                ? await prisma.componentCategory.findUnique({
                      where: {
                          value,
                      },
                  })
                : await prisma.layoutCategory.findUnique({
                      where: {
                          value,
                      },
                  });
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            const deleted =
                type === 'component'
                    ? await prisma.componentCategory.delete({
                          where: {
                              value,
                          },
                      })
                    : await prisma.layoutCategory.delete({
                          where: {
                              value,
                          },
                      });

            if (deleted) {
                return res.json({ message: 'Deleted category' });
            } else
                return res
                    .status(400)
                    .json({ error: 'Failed to delete category' });
        }
    } catch (error: any) {
        console.log(error.message);

        res.status(400).json({
            error: error.message,
        });
    }
};
