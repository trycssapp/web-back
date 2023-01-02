import { Router } from 'express';
import { requireAdmin } from '../../lib/middleware/requireAdmin';
import requireAuth from '../../lib/middleware/requireAuth';
import prisma from '../../lib/prisma';
import { addDummyData } from '../controllers/component/addDummyData';
import { renderImage } from '../controllers/component/thumb/image';

const components = Router();

import { allComponents } from '../controllers/component/all';
import { createComponent } from '../controllers/component/create';
import { removeComponent } from '../controllers/component/delete';
import { editComponent } from '../controllers/component/edit';
import { getComponent } from '../controllers/component/get';

components.get('/delete', async (req: any, res: any) => {
    await prisma.component.deleteMany();
    return res.json({ message: true });
});
components.get('/', allComponents);
components.post('/', requireAuth, createComponent);
components.put('/:id/thumbnail', requireAuth, renderImage);
components.delete('/:id', requireAuth, removeComponent);
components.put('/:id', requireAuth, editComponent);
components.get('/:id', getComponent);
components.post('/dummy', requireAdmin, addDummyData);

export default components;
