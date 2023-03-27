import { DAY, HOUR } from 'common/constants/date';

import { Schedule } from 'common/types/schedule';

export const DEFAULT_SCHEDULE: Schedule = {
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
};
