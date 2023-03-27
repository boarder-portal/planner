import { DayEvent } from 'common/types/dayEvent';

export interface DayTemplate {
  id: string;
  name: string;
  dayStartTime: number;
  events: DayEvent[];
}
