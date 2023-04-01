import { Goal } from 'common/types/goal';

export interface ActionTag {
  id: string;
  name: string;
  color: string;
  icon?: string | null;
  goals: Goal[];
}

export type ActionTagPayload = Omit<ActionTag, 'id'>;
