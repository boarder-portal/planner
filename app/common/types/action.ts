import { Goal } from 'common/types/goal';

export interface Action {
  id: string;
  name: string;
  color: string;
  icon: string;
  tagIds: string[];
  goals: Goal[];
}
