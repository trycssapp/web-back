import { Request } from 'express';
import puppeteer from 'puppeteer';
import prisma from '../../../../lib/prisma';
import { APIJson } from '../../../../lib/types/types';

export const renderImage = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        let browser = puppeteer.launch({
            headless: true,
            defaultViewport: null,

            args: ['--no-sandbox', '--disabled-setupid-sandbox'],
        });

        console.log(`${req.user?.id} started rendering thumbnail for ${id}`);
        (async () => {
            const page = await (await browser).newPage();
            await page.goto(
                `${process.env.FRONTEND_URL}/component/${id}/preview`,
                {
                    waitUntil: 'networkidle0',
                }
            );
            // await page.setViewport({ width: 1920, height: 1080 });
            const image = await page.screenshot({ fullPage: true });
            const b64 = Buffer.from(image).toString('base64');
            const mimeType = 'image/png';

            if (image) {
                const updated = await prisma.post.update({
                    where: {
                        id,
                    },
                    data: {
                        generatedImage: `data:${mimeType};base64,${b64}`,
                    },
                });
                if (updated) {
                    return res.json({
                        payload: { results: updated },
                    });
                } else return res.json({ error: 'true' });
            }

            await page.close();
        })();
    } catch (error) {
        console.log(error);
    }
};
