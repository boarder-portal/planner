import Router from '@koa/router';

import { Context, State } from 'server/types/koa';

import addActionTag from 'server/api/actionTags/add';
import editActionTag from 'server/api/actionTags/edit';
import deleteActionTag from 'server/api/actionTags/delete';

const actionTagsRouter = new Router<State, Context>();

actionTagsRouter.post('/add', addActionTag);
actionTagsRouter.post('/edit', editActionTag);
actionTagsRouter.post('/delete', deleteActionTag);

export default actionTagsRouter;
