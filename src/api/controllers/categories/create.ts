import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';
import { Category } from './../../../lib/types/types';

export const addCategory = async (req: Request, res: APIJson) => {
    try {
        let array: Category[] = [];
        const added = async () => {
            if (Array.isArray(req.body)) {
                req.body.forEach(async (x) => {
                    console.log('array', x);

                    await prisma.category
                        .create({
                            data: {
                                label: x.label,
                                value: x.value,
                            },
                        })
                        .then((x) => array.push(x));
                });
            } else {
                console.log('singEl', req.body);
                await prisma.category.create({
                    data: {
                        label: req.body.label,
                        value: req.body.value,
                    },
                });
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
