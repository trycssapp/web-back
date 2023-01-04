import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const editCategory = async (req: Request, res: APIJson) => {
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
            const edit =
                type === 'component'
                    ? await prisma.componentCategory.update({
                          where: {
                              value,
                          },
                          data: {
                              ...req.body,
                          },
                      })
                    : await prisma.layoutCategory.update({
                          where: {
                              value,
                          },
                          data: {
                              ...req.body,
                          },
                      });

            if (edit) {
                return res.json({
                    payload: {
                        results: {
                            edit,
                        },
                    },
                });
            } else {
                res.status(400).json({ error: 'Failed to update category' });
            }
        }
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
