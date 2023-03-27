export interface ScheduleSettings {
  dayTemplatesDefaults: DayTemplatesDefaults;
  timezone: string;
  defaultDayStartTime: number;
  defaultWeekStartTime: number;
}

export interface DayTemplatesDefaults {
  templateId?: string | null;
  weekDaysTemplateIds: (string | null | undefined)[];
}
