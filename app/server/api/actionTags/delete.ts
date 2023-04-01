import { Middleware } from 'server/types/koa';

import { throwNoUser } from 'server/utilities/api';

import User from 'server/db/models/user';

export interface DeleteActionTagRequest {
  id: string;
}

export interface DeleteActionTagResponse {}

const deleteActionTag: Middleware<DeleteActionTagResponse> = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    return throwNoUser(ctx);
  }

  const { id }: DeleteActionTagRequest = ctx.request.body;

  await User.updateOne(
    { _id: user.id },
    {
      $pull: {
        'schedule.actionTags': { id },
      },
    },
  );

  ctx.body = {};
};

export default deleteActionTag;
