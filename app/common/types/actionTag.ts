import { Goal } from 'common/types/goal';

export interface ActionTag {
  id: string;
  name: string;
  color: string;
  icon: string;
  goals: Goal[];
}
