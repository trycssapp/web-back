import { Router } from 'express';
import { searchPages } from '../controllers/search/layouts/index';
import { searchComponents } from './../controllers/search/components/index';

const search = Router();

import { searchGlobal } from '../controllers/search/global';

search.post('/', searchGlobal);
search.post('/pages', searchPages);
search.post('/components', searchComponents);

export default search;
