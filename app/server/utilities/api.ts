import { Context } from 'server/types/koa';

export function throwNoUser(ctx: Context): never {
  ctx.throw(401);
}
