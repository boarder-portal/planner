import { hash, verify } from 'argon2';
import { Schema } from 'mongoose';

import { ModelInstance } from 'server/types/mongoose';
import { User } from 'common/types/user';

import db from 'server/db';

const goalSchema = new Schema(
  {
    periodType: {
      type: String,
      enum: ['week', 'day'],
      required: true,
    },
    limitType: {
      type: String,
      enum: ['min', 'max'],
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const weekGoalSchema = new Schema(
  {
    weekStartDay: {
      type: String,
      required: true,
    },
    weekStart: Date,
    goals: {
      type: [goalSchema],
      required: true,
    },
  },
  { _id: false },
);

const tagSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    icon: String,
    goals: {
      type: [goalSchema],
      required: true,
    },
  },
  { _id: false },
);

const actionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    tagIds: {
      type: [String],
      required: true,
    },
    goals: {
      type: [goalSchema],
      required: true,
    },
  },
  { _id: false },
);

const dayEventSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    actionId: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const dayTemplateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dayStartTime: {
      type: Number,
      required: true,
    },
    events: {
      type: [dayEventSchema],
      required: true,
    },
  },
  { _id: false },
);

const dayScheduleSchema = new Schema(
  {
    dayString: {
      type: String,
      required: true,
    },
    dayStart: Date,
    templateId: String,
    events: [dayEventSchema],
    goals: [goalSchema],
  },
  { _id: false },
);

const dayTemplatesDefaultSchema = new Schema(
  {
    templateId: String,
    weekDaysTemplateIds: [String],
  },
  { _id: false },
);

const scheduleSettingsSchema = new Schema(
  {
    dayTemplatesDefaults: {
      type: dayTemplatesDefaultSchema,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    defaultDayStartTime: {
      type: Number,
      required: true,
    },
    defaultWeekStartTime: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const scheduleSchema = new Schema(
  {
    actionTags: {
      type: [tagSchema],
      required: true,
    },
    actions: {
      type: [actionSchema],
      required: true,
    },
    dayTemplates: {
      type: [dayTemplateSchema],
      required: true,
    },
    weekGoals: {
      type: [weekGoalSchema],
      required: true,
    },
    daySchedules: {
      type: [dayScheduleSchema],
      required: true,
    },
    settings: {
      type: scheduleSettingsSchema,
      required: true,
    },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    login: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    schedule: {
      type: scheduleSchema,
      required: true,
    },
  },
  {
    methods: {
      getId(): string {
        return String(this._id);
      },
      toData(): User {
        return {
          id: String(this._id),
          login: this.login,
          schedule: this.schedule,
        };
      },
      async validatePassword(password: string): Promise<boolean> {
        return verify(this.password ?? '', password);
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await hash(this.password ?? '');

    return next();
  } catch (err) {
    return next(err instanceof Error ? err : new Error('Hash failed'));
  }
});

const UserModel = db.model('user', userSchema, 'users');

export type UserDbInstance = ModelInstance<typeof UserModel>;

export default UserModel;
