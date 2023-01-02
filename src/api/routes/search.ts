import { Router } from 'express';

const search = Router();

import { searchComponents } from '../controllers/search/global';

search.post('/', searchComponents);

export default search;
