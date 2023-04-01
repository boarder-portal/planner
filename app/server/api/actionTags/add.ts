import { v4 as uuid } from 'uuid';

import { Middleware } from 'server/types/koa';
import { ActionTag, ActionTagPayload } from 'common/types/actionTag';

import { throwNoUser } from 'server/utilities/api';

import User from 'server/db/models/user';

export interface AddActionTagRequest {
  payload: ActionTagPayload;
}

export interface AddActionTagResponse {
  actionTag: ActionTag;
}

const addActionTag: Middleware<AddActionTagResponse> = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    return throwNoUser(ctx);
  }

  const { payload }: AddActionTagRequest = ctx.request.body;

  const id = uuid();

  const actionTag: ActionTag = {
    id,
    ...payload,
  };

  await User.updateOne(
    { _id: user.id },
    {
      $push: {
        'schedule.actionTags': actionTag,
      },
    },
  );

  ctx.body = {
    actionTag,
  };
};

export default addActionTag;
