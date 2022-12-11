import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const sendImageToS3 = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    const BUCKET_NAME = process.env.BUCKET_NAME as string;
    const BUCKET_REGION = process.env.BUCKET_REGION as string;
    const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
    const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

    const params = {
        Bucket: BUCKET_NAME,
        Key: id + '.png',
        Body: Buffer.from(req.body?.buffer),
        ContenType: 'image/png',
    };

    const s3 = new S3Client({
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
        region: BUCKET_REGION,
    });
    try {
        console.log(`${req.user?.id}: generating thumbnail for ${id}`);
        const put = new PutObjectCommand(params);

        await s3.send(put);
        const command = new GetObjectCommand(params);
        // const url = await getSignedUrl(s3, command, { expiresIn: 9000 });

        // if (url) {
        const updated = await prisma.post.update({
            where: {
                id,
            },
            data: {
                generatedImage: `https://all-thumbnails.s3.us-west-2.amazonaws.com/${id}.png`,
            },
        });
        if (updated) {
            return res.json({
                payload: { results: updated },
            });
        }
        // } else return res.json({ error: 'failed to upload image to S3' });

        // console.log(req.file);
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            error: error.message,
        });
    }
};
