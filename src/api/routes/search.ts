import { Router } from 'express';
import { searchComponents } from './../controllers/search/components/index';
import { searchPages } from './../controllers/search/pages/index';

const search = Router();

import { searchGlobal } from '../controllers/search/global';

search.post('/', searchGlobal);
search.post('/pages', searchPages);
search.post('/components', searchComponents);

export default search;
