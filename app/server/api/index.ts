import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

import { Context, State } from 'server/types/koa';

import authRouter from 'server/api/auth';

const apiRouter = new Router<State, Context>({
  prefix: '/api',
});

apiRouter.use(bodyParser());

apiRouter.use('/auth', authRouter.routes(), authRouter.allowedMethods());

export default apiRouter;
