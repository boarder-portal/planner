import Router from '@koa/router';

import { Context, State } from 'server/types/koa';

import register from 'server/api/auth/register';
import logout from 'server/api/auth/logout';
import login from 'server/api/auth/login';

const authRouter = new Router<State, Context>();

authRouter.post('/register', register);
authRouter.post('/logout', logout);
authRouter.post('/login', login);

export default authRouter;
