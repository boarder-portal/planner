import { ActionTag } from 'common/types/actionTag';
import { Action } from 'common/types/action';
import { DayTemplate } from 'common/types/dayTemplate';
import { ScheduleSettings } from 'common/types/scheduleSettings';
import { WeekGoal } from 'common/types/goal';
import { DaySchedule } from 'common/types/daySchedule';

export interface Schedule {
  tags: ActionTag[];
  actions: Action[];
  dayTemplates: DayTemplate[];
  weekGoals: WeekGoal[];
  daySchedules: DaySchedule[];
  settings: ScheduleSettings;
}
