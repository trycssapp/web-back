import { Router } from 'express';
import { requireAdmin } from '../../lib/middleware/requireAdmin';
import requireAuth from '../../lib/middleware/requireAuth';
import prisma from '../../lib/prisma';
import { addDummyData } from '../controllers/pages/addDummyData';

const pages = Router();

import { allPages } from '../controllers/pages/all';
import { createPage } from '../controllers/pages/create';
import { removePage } from '../controllers/pages/delete';
import { editPage } from '../controllers/pages/edit';
import { getPage } from '../controllers/pages/get';

pages.get('/delete', async (req: any, res: any) => {
    await prisma.page.deleteMany();
    return res.json({ message: true });
});
pages.get('/', allPages);
pages.post('/', requireAuth, createPage);
pages.delete('/:id', requireAuth, removePage);
pages.put('/:id', requireAuth, editPage);
pages.get('/:id', getPage);
pages.post('/dummy', requireAdmin, addDummyData);

export default pages;
