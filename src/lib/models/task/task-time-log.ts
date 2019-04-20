import { IdentifiableModel } from "../common/identifiable-model";
import { TimeStamp } from "../common/time";
import { ErrorAbleResponse } from "../common/error-able-response";

export interface TaskTimelog extends IdentifiableModel, ErrorAbleResponse {
  name: string;
  total: TimeStamp;
  users: TaskTimelogUser[];
}

export interface TaskTimelogUser extends IdentifiableModel {
  username: string;
  timelogged: string;
  datecreated: string | Date;
  timecreated: string;
}

export interface TaskTimelogRequest extends ErrorAbleResponse {
  userId: number;
  taskId: number;
  comment: string;
  hoursLogged: number;
  minutesLogged: number;
}
