import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const removePage = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    const BUCKET_NAME = process.env.BUCKET_NAME as string;
    const BUCKET_REGION = process.env.BUCKET_REGION as string;
    const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
    const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

    const s3 = new S3Client({
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
        region: BUCKET_REGION,
    });
    const params = {
        Bucket: BUCKET_NAME,
        Key: id + '.png',
    };
    try {
        const post = await prisma.page.findUnique({
            where: {
                id,
            },
        });
        if (post) {
            if (
                req.user &&
                (req.user.role == 'ADMIN' || req.user?.id === post.authorId)
            ) {
                const deleted = await prisma.page.delete({
                    where: {
                        id,
                    },
                });
                if (deleted) {
                    const command = new DeleteObjectCommand(params);
                    await s3.send(command);
                    return res.json({ message: 'Deleted page' });
                } else {
                    res.status(404).json({ error: 'Page not found' });
                }
            } else {
                return res.status(401);
            }
        } else return res.status(404).json({ error: 'Page not found' });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
