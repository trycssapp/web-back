import { Router } from 'express';
import { allLibraries } from '../controllers/library/all';
import { addLibrary } from '../controllers/library/create';
import { removeLibrary } from '../controllers/library/delete';
import { editLibrary } from '../controllers/library/edit';
import { requireAdmin } from './../../lib/middleware/requireAdmin';

const library = Router();

library.post('/', requireAdmin, addLibrary);
library.get('/', allLibraries);
library.delete('/:value', requireAdmin, removeLibrary);
library.put('/:value', requireAdmin, editLibrary);

export default library;
