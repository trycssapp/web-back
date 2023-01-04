import { Request, Response, Router } from 'express';
import auth from './routes/auth';
import categories from './routes/categories';
import component from './routes/component';
import layouts from './routes/layouts';
import library from './routes/library';
import search from './routes/search';
import thumbnail from './routes/thumbnail';
import user from './routes/user';

const api = Router();

api.get('/', (req: Request, res: Response) => {
    res.json(req.user);
});

api.use('/auth', auth);
api.use('/users', user);
api.use('/components', component);
api.use('/layouts', layouts);
api.use('/search', search);
api.use('/categories', categories);
api.use('/library', library);
api.use('/thumbnail', thumbnail);

export default api;
