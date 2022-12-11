import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Request } from 'express';
import { APIJson } from '../../../lib/types/types';

export const getImageFromS3 = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    const BUCKET_NAME = process.env.BUCKET_NAME as string;
    const BUCKET_REGION = process.env.BUCKET_REGION as string;
    const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
    const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

    const getObjectParams = {
        Bucket: BUCKET_NAME,
        // Key: req.file?.originalname,
        Key: id + '.png',
    };

    try {
        const s3 = new S3Client({
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
            region: BUCKET_REGION,
        });

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        if (url) {
            res.send({ message: url });
        }
    } catch (error) {
        console.log(error);
    }
};
