import { Router } from 'express';
import { sendImageToS3 } from '../controllers/thumbnail/post';
import { requireAuth } from './../../lib/middleware/requireAuth';
import { getImageFromS3 } from './../controllers/thumbnail/get';

const thumbnail = Router();

thumbnail.put('/:id', requireAuth, sendImageToS3);
thumbnail.get('/:id', getImageFromS3);

export default thumbnail;
