import { Middleware as KoaMiddleware, ParameterizedContext } from 'koa';
import expressSession from 'express-session';

import { User } from 'common/types/user';

export interface State {
  user: User | null;
  session: expressSession.Session;
}

export type Context<Body = unknown> = ParameterizedContext<State, {}, Body>;

export type Middleware<Body = unknown> = KoaMiddleware<State, Context, Body>;

export type Query<Payload extends object> = {
  [K in keyof Payload]?: string | string[];
};
