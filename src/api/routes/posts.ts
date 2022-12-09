import { Router } from 'express';
import requireAuth from '../../lib/middleware/requireAuth';
import prisma from '../../lib/prisma';
import { addDummyData } from '../controllers/posts/addDummyData';
import { renderImage } from '../controllers/posts/thumb/image';
import { requireAdmin } from './../../lib/middleware/requireAdmin';

const posts = Router();

import { allPosts } from '../controllers/posts/all';
import { createPost } from '../controllers/posts/create';
import { removePost } from '../controllers/posts/delete';
import { editPost } from '../controllers/posts/edit';
import { getPost } from '../controllers/posts/get';

posts.get('/delete', async (req: any, res: any) => {
    await prisma.post.deleteMany();
    return res.json({ message: true });
});
posts.get('/', allPosts);
posts.post('/', requireAuth, createPost);
posts.put('/:id/thumbnail', renderImage);
posts.delete('/:id', requireAuth, removePost);
posts.put('/:id', requireAuth, editPost);
posts.get('/:id', getPost);
posts.post('/dummy', requireAdmin, addDummyData);

export default posts;
