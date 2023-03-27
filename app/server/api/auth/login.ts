import { Middleware } from 'server/types/koa';
import { User } from 'common/types/user';

import UserModel from 'server/db/models/user';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

const login: Middleware<LoginResponse> = async (ctx) => {
  const { login, password }: LoginRequest = ctx.request.body;

  const user = await UserModel.findOne({ login });

  if (!user) {
    return ctx.throw(400);
  }

  const isSamePassword = await user.validatePassword(password);

  if (!isSamePassword) {
    return ctx.throw(400);
  }

  ctx.state.session.userId = user.getId();

  await ctx.state.session.asyncSave();

  ctx.body = {
    user: user.toData(),
  };
};

export default login;
