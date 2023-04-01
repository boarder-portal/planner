import { Middleware } from 'server/types/koa';
import { ActionTag } from 'common/types/actionTag';

import { throwNoUser } from 'server/utilities/api';

import User from 'server/db/models/user';

export interface EditActionTagRequest {
  actionTag: ActionTag;
}

export interface EditActionTagResponse {
  actionTag: ActionTag;
}

const editActionTag: Middleware<EditActionTagResponse> = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    return throwNoUser(ctx);
  }

  const { actionTag }: EditActionTagRequest = ctx.request.body;

  await User.updateOne(
    { _id: user.id },
    {
      $set: {
        'schedule.actionTags.$[edited]': actionTag,
      },
    },
    { arrayFilters: [{ 'edited.id': actionTag.id }] },
  );

  ctx.body = {
    actionTag,
  };
};

export default editActionTag;
