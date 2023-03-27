import { DEFAULT_SCHEDULE } from 'common/constants/schedule';

import { Middleware } from 'server/types/koa';
import { User, UserCreatePayload } from 'common/types/user';

import UserModel from 'server/db/models/user';

export interface RegisterRequest {
  login: string;
  password: string;
  timezone: string;
}

export interface RegisterResponse {
  user: User;
}

const register: Middleware<RegisterResponse> = async (ctx) => {
  const { login, password, timezone }: RegisterRequest = ctx.request.body;

  const userWithLogin = await UserModel.findOne({ login });

  if (userWithLogin) {
    return ctx.throw(409);
  }

  const userCreatePayload: UserCreatePayload = {
    login,
    password,
    schedule: {
      ...DEFAULT_SCHEDULE,
      settings: {
        ...DEFAULT_SCHEDULE.settings,
        timezone,
      },
    },
  };

  const user = await UserModel.create(userCreatePayload);

  ctx.state.session.userId = user.getId();

  await ctx.state.session.asyncSave();

  ctx.body = {
    user: user.toData(),
  };
};

export default register;
