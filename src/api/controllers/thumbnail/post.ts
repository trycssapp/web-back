import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const sendImageToS3 = async (req: Request, res: APIJson) => {
    const id = req.params.id;
    const { type } = req.query as { type: 'layout' | 'component' };

    const BUCKET_NAME = process.env.BUCKET_NAME as string;
    const BUCKET_REGION = process.env.BUCKET_REGION as string;
    const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
    const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

    const params = {
        Bucket: BUCKET_NAME,
        Key: id + '.png',
        Body: Buffer.from(req.body?.buffer),
        ContentType: 'image/png',
    };

    const s3 = new S3Client({
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
        region: BUCKET_REGION,
    });
    try {
        const put = new PutObjectCommand(params);

        await s3.send(put);
        const updated =
            type == 'component'
                ? await prisma.component.update({
                      where: {
                          id,
                      },
                      data: {
                          generatedImage: `https://all-thumbnails.s3.us-west-2.amazonaws.com/${id}.png`,
                      },
                  })
                : await prisma.page.update({
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
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            error: error.message,
        });
    }
};
