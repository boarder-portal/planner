import 'server/utilities/importEnv';

import fs from 'node:fs/promises';
import path from 'node:path';

import serve from 'koa-static';
import mount from 'koa-mount';

import SharedStore from 'common/utilities/SharedStore';
import { session } from 'server/utilities/session';
import { client as redisClient } from 'server/utilities/redis';

import UserModel from 'server/db/models/user';
import { migrate } from 'server/db/migrations/migrator';

import { app, server } from 'server/server';
import api from 'server/api';

const indexHtmlPath = path.resolve('./dist/index.html');
let indexHtmlContents = '';

const PORT = Number(process.env.PORT);

app.use(
  mount(
    '/static',
    serve(path.resolve('./static'), {
      gzip: true,
    }),
  ),
);
app.use(
  mount(
    '/public',
    serve(path.resolve('./dist'), {
      gzip: true,
    }),
  ),
);
app.use(session);
app.use(async (ctx, next) => {
  const userId = ctx.state.session.userId;

  ctx.state.user = userId ? (await UserModel.findById(userId))?.toData() ?? null : null;

  await next();
});
app.use(api.routes());
app.use(api.allowedMethods());
app.use(async (ctx) => {
  const sharedStore = new SharedStore();

  sharedStore.setValue('user', ctx.state.user);

  ctx.type = 'text/html';
  ctx.body = indexHtmlContents.replace(
    '"__STORE_VALUES__"',
    `
    window.__STORE_VALUES__ = ${JSON.stringify(sharedStore.toJSON()).replace(/</g, '\\u003c')};
  `,
  );
});

(async () => {
  await Promise.all([redisClient.connect(), migrate()]);

  indexHtmlContents = await fs.readFile(indexHtmlPath, 'utf8');

  await new Promise<void>((resolve) => {
    server.listen(PORT, resolve);
  });

  console.log(`Listening on http://localhost:${PORT}...`);
})().catch((err) => {
  console.log(err);

  process.exit(1);
});
