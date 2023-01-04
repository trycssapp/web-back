import { Router } from 'express';
import { requireAdmin } from '../../lib/middleware/requireAdmin';
import requireAuth from '../../lib/middleware/requireAuth';
import { addDummyData } from '../controllers/layouts/addDummyData';

const layouts = Router();

import { allLayouts } from '../controllers/layouts/all';
import { createLayout } from '../controllers/layouts/create';
import { removeLayout } from '../controllers/layouts/delete';
import { editLayout } from '../controllers/layouts/edit';
import { getLayout } from '../controllers/layouts/get';

layouts.get('/', allLayouts);
layouts.post('/', requireAuth, createLayout);
layouts.delete('/:id', requireAuth, removeLayout);
layouts.put('/:id', requireAuth, editLayout);
layouts.get('/:id', getLayout);
layouts.post('/dummy', requireAdmin, addDummyData);

export default layouts;
