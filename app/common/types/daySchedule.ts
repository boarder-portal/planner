import { DayEvent } from 'common/types/dayEvent';
import { Goal } from 'common/types/goal';

export interface DaySchedule {
  dayString: string;
  dayStart?: Date | null;
  templateId?: string | null;
  events?: DayEvent[] | null;
  goals?: Goal[] | null;
}
