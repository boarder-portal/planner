export type GoalPeriodType = 'week' | 'day';

export type GoalLimitType = 'min' | 'max';

export interface Goal {
  periodType: GoalPeriodType;
  limitType: GoalLimitType;
  limit: number;
}

export interface WeekGoal {
  weekStartDay: string;
  weekStart?: Date | null;
  goals: Goal[];
}
