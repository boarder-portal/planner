import { Schedule } from 'common/types/schedule';

export interface User {
  id: string;
  login: string;
  password?: never;
  schedule: Schedule;
}

export interface UserCreatePayload {
  login: string;
  password: string;
  schedule: Schedule;
}
