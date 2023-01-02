import { Router } from 'express';

const search = Router();

import { searchComponents } from '../controllers/search/components';

search.post('/', searchComponents);

export default search;
