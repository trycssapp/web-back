import { Router } from 'express';
import { searchLayouts } from '../controllers/search/layouts/index';
import { searchComponents } from './../controllers/search/components/index';

const search = Router();

import { searchGlobal } from '../controllers/search/global';

search.post('/', searchGlobal);
search.post('/layouts', searchLayouts);
search.post('/components', searchComponents);

export default search;
