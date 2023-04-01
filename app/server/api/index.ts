import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

import { Context, State } from 'server/types/koa';

import authRouter from 'server/api/auth';
import actionTagsRouter from 'server/api/actionTags';

const apiRouter = new Router<State, Context>({
  prefix: '/api',
});

apiRouter.use(bodyParser());

apiRouter.use('/auth', authRouter.routes(), authRouter.allowedMethods());
apiRouter.use('/schedule/actionTags', actionTagsRouter.routes(), actionTagsRouter.allowedMethods());

export default apiRouter;
