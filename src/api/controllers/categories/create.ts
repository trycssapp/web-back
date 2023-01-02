import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';
import { Category } from './../../../lib/types/types';

export const addCategory = async (req: Request, res: APIJson) => {
    const { type } = req.query as { type: 'components' | 'pages' };
    try {
        let array: Category[] = [];
        const added = async () => {
            if (Array.isArray(req.body)) {
                req.body.forEach(async (x) => {
                    if (type === 'components') {
                        await prisma.componentCategory
                            .create({
                                data: {
                                    label: x.label,
                                    value: x.value,
                                },
                            })
                            .then((x) => array.push(x));
                    } else if (type === 'pages') {
                        await prisma.pageCategory
                            .create({
                                data: {
                                    label: x.label,
                                    value: x.value,
                                },
                            })
                            .then((x) => array.push(x));
                    }
                });
            } else {
                if (type == 'components') {
                    await prisma.componentCategory.create({
                        data: {
                            label: req.body.label,
                            value: req.body.value,
                        },
                    });
                } else if (type == 'pages') {
                    await prisma.pageCategory.create({
                        data: {
                            label: req.body.label,
                            value: req.body.value,
                        },
                    });
                }
                array.push(req.body);
            }
            return array;
        };
        await added();
        console.log(array);

        return res.json({ payload: { results: array } });
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({
            error: error.message,
        });
    }
};
