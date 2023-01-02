import { Router } from 'express';
import { requireAdmin } from '../../lib/middleware/requireAdmin';
import requireAuth from '../../lib/middleware/requireAuth';
import prisma from '../../lib/prisma';
import { addDummyData } from '../controllers/components/addDummyData';

const components = Router();

import { allComponents } from '../controllers/components/all';
import { createComponent } from '../controllers/components/create';
import { removeComponent } from '../controllers/components/delete';
import { editComponent } from '../controllers/components/edit';
import { getComponent } from '../controllers/components/get';

components.get('/delete', async (req: any, res: any) => {
    await prisma.component.deleteMany();
    return res.json({ message: true });
});
components.get('/', allComponents);
components.post('/', requireAuth, createComponent);
components.delete('/:id', requireAuth, removeComponent);
components.put('/:id', requireAuth, editComponent);
components.get('/:id', getComponent);
components.post('/dummy', requireAdmin, addDummyData);

export default components;
