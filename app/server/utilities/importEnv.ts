import path from 'node:path';

import fs from 'fs-extra';
import { config, parse } from 'dotenv';
import colors from 'colors';

config({
  path: process.env.NODE_ENV === 'production' ? path.resolve('.env') : path.resolve('.dev.env'),
});

config({
  path: process.env.NODE_ENV === 'production' ? path.resolve('.secret.env') : path.resolve('.dev.secret.env'),
});

const basicValues = parse(fs.readFileSync(path.resolve('.example.env')));
const secretValues = parse(fs.readFileSync(path.resolve('.secret.example.env')));

Object.keys({ ...basicValues, ...secretValues }).forEach((key) => {
  if (!process.env[key]) {
    console.error(`${colors.blue(colors.bold(key))} env variable not set`);

    process.exit(1);
  }
});
