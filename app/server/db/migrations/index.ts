import { Schema } from 'mongoose';

import { DAY, HOUR } from 'common/constants/date';

import { Migration } from 'server/db/migrations/migrator';

import db from 'server/db';

const migrations: Migration[] = [
  {
    async up() {
      const UserModel = db.model(
        'user-migration-0',
        new Schema({
          schedule: Object,
        }),
        'users',
      );

      await UserModel.updateMany(
        {},
        {
          $set: {
            schedule: {
              tags: [],
              actions: [],
              dayTemplates: [],
              weekGoals: [],
              daySchedules: [],
              settings: {
                dayTemplatesDefaults: {
                  templateId: null,
                  weekDaysTemplateIds: [],
                },
                timezone: 'UTC',
                defaultDayStartTime: 6 * HOUR,
                defaultWeekStartTime: DAY + 6 * HOUR,
              },
            },
          },
        },
      );
    },
    async down() {
      const UserModel = db.model(
        'user-migration-0',
        new Schema({
          schedule: Object,
        }),
        'users',
      );

      await UserModel.updateMany(
        {},
        {
          $unset: {
            schedule: true,
          },
        },
      );
    },
  },
];

export default migrations;
